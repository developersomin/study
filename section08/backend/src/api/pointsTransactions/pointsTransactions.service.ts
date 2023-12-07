import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DataSource, Repository} from 'typeorm';
import {POINT_TRANSACTION_STATUS_ENUM, PointTransaction} from './entities/pointTransaction.entity';
import {IPointsTransactionsServiceCreate} from './interfaces/points-transactions-service.interface';
import {User} from "../users/entities/user.entity";
import {query} from "express";

@Injectable()
export class PointsTransactionsService {
  constructor(
      @InjectRepository(PointTransaction)
      private readonly pointsTransactionsRepository: Repository<PointTransaction>,
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>,
      private readonly dataSource: DataSource,
  ) {
  }

  async create({ impUid,amount,user }: IPointsTransactionsServiceCreate):Promise<PointTransaction> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    queryRunner.startTransaction("SERIALIZABLE");

    try {
      //1.pointTransaction 테이블에 거래기록 1줄 생성
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid: impUid,
        amount: amount,
        user: user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      //await this.pointsTransactionsRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);
      //2. 유저 돈 찾기
      /*const findUser = await this.usersRepository.findOne({
        where: {id: user.id}
      });*/
      const findUser = await queryRunner.manager.findOne(User, {
        where: {id: user.id},
        lock: {mode: 'pessimistic_write'}
      });

      //3. 유저의 돈 업데이트
      /* await this.usersRepository.update(
           {id: user.id},
           {point: findUser.point + amount});*/
      //
      const updateUser = this.usersRepository.create({
        ...findUser,
        point: findUser.point + amount,
      });
/*    //유저의 돈을 찾아서 업데이트하기 숫자일때만 가능, 문자일때 직접 lock걸기
      const id = user.id;
      await queryRunner.manager.increment(User, {id}, 'point', amount);*/

      await queryRunner.manager.save(updateUser);
      await queryRunner.commitTransaction();

      return pointTransaction;
    } catch (error){
      await queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }
}
