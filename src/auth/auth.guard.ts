import { Injectable, ExecutionContext } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your own custom logic for allowing or denying access to the resolver
    // For example, you can check the request context to determine if the user has access
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext()

    return super.canActivate(
      new ExecutionContextHost([req]),
    );
  }
}