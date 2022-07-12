import { builder } from "../builder"
import { User } from "@/schema/User"
import * as Inputs from '@/schema/inputs'
import { db } from "@/db"

export const queries = builder.queryFields((t) => ({
  findOneUser: t.field({
    type: User,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UserWhereInput }),
      orderBy: t.arg({ type: [Inputs.UserOrderByWithRelationInput] }),
      cursor: t.arg({ type: Inputs.UserWhereUniqueInput }),
      take: t.arg({ type: 'Int' }),
      skip: t.arg({ type: 'Int' }),
      distinct: t.arg({ type: [Inputs.UserScalarFieldEnum] }),
    },
    resolve: async (root, args) => {
      console.log({ where: args.where })
      const user = await db.user.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })

      return user
    }
  })
}))
