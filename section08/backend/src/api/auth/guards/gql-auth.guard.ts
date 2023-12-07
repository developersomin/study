import {AuthGuard} from "@nestjs/passport";
import {ExecutionContext} from "@nestjs/common";
import {GqlExecutionContext} from "@nestjs/graphql";
export const GqlAuthGuard= (name) => {
    return class GqlAuthGuard extends AuthGuard(name) {
        getRequest(context: ExecutionContext) {
            const gqlContext = GqlExecutionContext.create(context);
            console.log(gqlContext.getContext().req.headers.authorization);
            return gqlContext.getContext().req;
        }
    }
}
