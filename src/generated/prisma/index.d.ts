
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model NewsArticle
 * 
 */
export type NewsArticle = $Result.DefaultSelection<Prisma.$NewsArticlePayload>
/**
 * Model Partner
 * 
 */
export type Partner = $Result.DefaultSelection<Prisma.$PartnerPayload>
/**
 * Model TimelineItem
 * 
 */
export type TimelineItem = $Result.DefaultSelection<Prisma.$TimelineItemPayload>
/**
 * Model MemberCompany
 * 
 */
export type MemberCompany = $Result.DefaultSelection<Prisma.$MemberCompanyPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Projects
   * const projects = await prisma.project.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsArticle`: Exposes CRUD operations for the **NewsArticle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsArticles
    * const newsArticles = await prisma.newsArticle.findMany()
    * ```
    */
  get newsArticle(): Prisma.NewsArticleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.partner`: Exposes CRUD operations for the **Partner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Partners
    * const partners = await prisma.partner.findMany()
    * ```
    */
  get partner(): Prisma.PartnerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timelineItem`: Exposes CRUD operations for the **TimelineItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimelineItems
    * const timelineItems = await prisma.timelineItem.findMany()
    * ```
    */
  get timelineItem(): Prisma.TimelineItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memberCompany`: Exposes CRUD operations for the **MemberCompany** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemberCompanies
    * const memberCompanies = await prisma.memberCompany.findMany()
    * ```
    */
  get memberCompany(): Prisma.MemberCompanyDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Project: 'Project',
    Service: 'Service',
    NewsArticle: 'NewsArticle',
    Partner: 'Partner',
    TimelineItem: 'TimelineItem',
    MemberCompany: 'MemberCompany'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "project" | "service" | "newsArticle" | "partner" | "timelineItem" | "memberCompany"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      NewsArticle: {
        payload: Prisma.$NewsArticlePayload<ExtArgs>
        fields: Prisma.NewsArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          findFirst: {
            args: Prisma.NewsArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          findMany: {
            args: Prisma.NewsArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>[]
          }
          create: {
            args: Prisma.NewsArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          createMany: {
            args: Prisma.NewsArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>[]
          }
          delete: {
            args: Prisma.NewsArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          update: {
            args: Prisma.NewsArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          deleteMany: {
            args: Prisma.NewsArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewsArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>[]
          }
          upsert: {
            args: Prisma.NewsArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          aggregate: {
            args: Prisma.NewsArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsArticle>
          }
          groupBy: {
            args: Prisma.NewsArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsArticleCountArgs<ExtArgs>
            result: $Utils.Optional<NewsArticleCountAggregateOutputType> | number
          }
        }
      }
      Partner: {
        payload: Prisma.$PartnerPayload<ExtArgs>
        fields: Prisma.PartnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findFirst: {
            args: Prisma.PartnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findMany: {
            args: Prisma.PartnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          create: {
            args: Prisma.PartnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          createMany: {
            args: Prisma.PartnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartnerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          delete: {
            args: Prisma.PartnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          update: {
            args: Prisma.PartnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          deleteMany: {
            args: Prisma.PartnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PartnerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          upsert: {
            args: Prisma.PartnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          aggregate: {
            args: Prisma.PartnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartner>
          }
          groupBy: {
            args: Prisma.PartnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartnerCountArgs<ExtArgs>
            result: $Utils.Optional<PartnerCountAggregateOutputType> | number
          }
        }
      }
      TimelineItem: {
        payload: Prisma.$TimelineItemPayload<ExtArgs>
        fields: Prisma.TimelineItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimelineItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimelineItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineItemPayload>
          }
          findFirst: {
            args: Prisma.TimelineItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimelineItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineItemPayload>
          }
          findMany: {
            args: Prisma.TimelineItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineItemPayload>[]
          }
          create: {
            args: Prisma.TimelineItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineItemPayload>
          }
          createMany: {
            args: Prisma.TimelineItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimelineItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineItemPayload>[]
          }
          delete: {
            args: Prisma.TimelineItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineItemPayload>
          }
          update: {
            args: Prisma.TimelineItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineItemPayload>
          }
          deleteMany: {
            args: Prisma.TimelineItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimelineItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimelineItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineItemPayload>[]
          }
          upsert: {
            args: Prisma.TimelineItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineItemPayload>
          }
          aggregate: {
            args: Prisma.TimelineItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimelineItem>
          }
          groupBy: {
            args: Prisma.TimelineItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimelineItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimelineItemCountArgs<ExtArgs>
            result: $Utils.Optional<TimelineItemCountAggregateOutputType> | number
          }
        }
      }
      MemberCompany: {
        payload: Prisma.$MemberCompanyPayload<ExtArgs>
        fields: Prisma.MemberCompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberCompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberCompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberCompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberCompanyPayload>
          }
          findFirst: {
            args: Prisma.MemberCompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberCompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberCompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberCompanyPayload>
          }
          findMany: {
            args: Prisma.MemberCompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberCompanyPayload>[]
          }
          create: {
            args: Prisma.MemberCompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberCompanyPayload>
          }
          createMany: {
            args: Prisma.MemberCompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberCompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberCompanyPayload>[]
          }
          delete: {
            args: Prisma.MemberCompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberCompanyPayload>
          }
          update: {
            args: Prisma.MemberCompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberCompanyPayload>
          }
          deleteMany: {
            args: Prisma.MemberCompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberCompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemberCompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberCompanyPayload>[]
          }
          upsert: {
            args: Prisma.MemberCompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberCompanyPayload>
          }
          aggregate: {
            args: Prisma.MemberCompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemberCompany>
          }
          groupBy: {
            args: Prisma.MemberCompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberCompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberCompanyCountArgs<ExtArgs>
            result: $Utils.Optional<MemberCompanyCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    project?: ProjectOmit
    service?: ServiceOmit
    newsArticle?: NewsArticleOmit
    partner?: PartnerOmit
    timelineItem?: TimelineItemOmit
    memberCompany?: MemberCompanyOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    titleEn: string | null
    category: string | null
    location: string | null
    area: string | null
    duration: string | null
    client: string | null
    year: string | null
    image: string | null
    description: string | null
    descriptionEn: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    titleEn: string | null
    category: string | null
    location: string | null
    area: string | null
    duration: string | null
    client: string | null
    year: string | null
    image: string | null
    description: string | null
    descriptionEn: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    slug: number
    title: number
    titleEn: number
    category: number
    location: number
    area: number
    duration: number
    client: number
    year: number
    image: number
    images: number
    description: number
    descriptionEn: number
    published: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    titleEn?: true
    category?: true
    location?: true
    area?: true
    duration?: true
    client?: true
    year?: true
    image?: true
    description?: true
    descriptionEn?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    titleEn?: true
    category?: true
    location?: true
    area?: true
    duration?: true
    client?: true
    year?: true
    image?: true
    description?: true
    descriptionEn?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    titleEn?: true
    category?: true
    location?: true
    area?: true
    duration?: true
    client?: true
    year?: true
    image?: true
    images?: true
    description?: true
    descriptionEn?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    slug: string
    title: string
    titleEn: string
    category: string
    location: string
    area: string
    duration: string
    client: string
    year: string
    image: string
    images: string[]
    description: string
    descriptionEn: string
    published: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    titleEn?: boolean
    category?: boolean
    location?: boolean
    area?: boolean
    duration?: boolean
    client?: boolean
    year?: boolean
    image?: boolean
    images?: boolean
    description?: boolean
    descriptionEn?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    titleEn?: boolean
    category?: boolean
    location?: boolean
    area?: boolean
    duration?: boolean
    client?: boolean
    year?: boolean
    image?: boolean
    images?: boolean
    description?: boolean
    descriptionEn?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    titleEn?: boolean
    category?: boolean
    location?: boolean
    area?: boolean
    duration?: boolean
    client?: boolean
    year?: boolean
    image?: boolean
    images?: boolean
    description?: boolean
    descriptionEn?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    slug?: boolean
    title?: boolean
    titleEn?: boolean
    category?: boolean
    location?: boolean
    area?: boolean
    duration?: boolean
    client?: boolean
    year?: boolean
    image?: boolean
    images?: boolean
    description?: boolean
    descriptionEn?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "title" | "titleEn" | "category" | "location" | "area" | "duration" | "client" | "year" | "image" | "images" | "description" | "descriptionEn" | "published" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      title: string
      titleEn: string
      category: string
      location: string
      area: string
      duration: string
      client: string
      year: string
      image: string
      images: string[]
      description: string
      descriptionEn: string
      published: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly slug: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly titleEn: FieldRef<"Project", 'String'>
    readonly category: FieldRef<"Project", 'String'>
    readonly location: FieldRef<"Project", 'String'>
    readonly area: FieldRef<"Project", 'String'>
    readonly duration: FieldRef<"Project", 'String'>
    readonly client: FieldRef<"Project", 'String'>
    readonly year: FieldRef<"Project", 'String'>
    readonly image: FieldRef<"Project", 'String'>
    readonly images: FieldRef<"Project", 'String[]'>
    readonly description: FieldRef<"Project", 'String'>
    readonly descriptionEn: FieldRef<"Project", 'String'>
    readonly published: FieldRef<"Project", 'Boolean'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    order: number | null
  }

  export type ServiceSumAggregateOutputType = {
    order: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    slug: string | null
    order: number | null
    icon: string | null
    titleVi: string | null
    titleEn: string | null
    subtitleVi: string | null
    subtitleEn: string | null
    descVi: string | null
    descEn: string | null
    tag: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    order: number | null
    icon: string | null
    titleVi: string | null
    titleEn: string | null
    subtitleVi: string | null
    subtitleEn: string | null
    descVi: string | null
    descEn: string | null
    tag: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    slug: number
    order: number
    icon: number
    titleVi: number
    titleEn: number
    subtitleVi: number
    subtitleEn: number
    descVi: number
    descEn: number
    tag: number
    bulletsVi: number
    bulletsEn: number
    published: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    order?: true
  }

  export type ServiceSumAggregateInputType = {
    order?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    slug?: true
    order?: true
    icon?: true
    titleVi?: true
    titleEn?: true
    subtitleVi?: true
    subtitleEn?: true
    descVi?: true
    descEn?: true
    tag?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    slug?: true
    order?: true
    icon?: true
    titleVi?: true
    titleEn?: true
    subtitleVi?: true
    subtitleEn?: true
    descVi?: true
    descEn?: true
    tag?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    slug?: true
    order?: true
    icon?: true
    titleVi?: true
    titleEn?: true
    subtitleVi?: true
    subtitleEn?: true
    descVi?: true
    descEn?: true
    tag?: true
    bulletsVi?: true
    bulletsEn?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    slug: string
    order: number
    icon: string
    titleVi: string
    titleEn: string
    subtitleVi: string
    subtitleEn: string
    descVi: string
    descEn: string
    tag: string
    bulletsVi: string[]
    bulletsEn: string[]
    published: boolean
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    order?: boolean
    icon?: boolean
    titleVi?: boolean
    titleEn?: boolean
    subtitleVi?: boolean
    subtitleEn?: boolean
    descVi?: boolean
    descEn?: boolean
    tag?: boolean
    bulletsVi?: boolean
    bulletsEn?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    order?: boolean
    icon?: boolean
    titleVi?: boolean
    titleEn?: boolean
    subtitleVi?: boolean
    subtitleEn?: boolean
    descVi?: boolean
    descEn?: boolean
    tag?: boolean
    bulletsVi?: boolean
    bulletsEn?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    order?: boolean
    icon?: boolean
    titleVi?: boolean
    titleEn?: boolean
    subtitleVi?: boolean
    subtitleEn?: boolean
    descVi?: boolean
    descEn?: boolean
    tag?: boolean
    bulletsVi?: boolean
    bulletsEn?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    slug?: boolean
    order?: boolean
    icon?: boolean
    titleVi?: boolean
    titleEn?: boolean
    subtitleVi?: boolean
    subtitleEn?: boolean
    descVi?: boolean
    descEn?: boolean
    tag?: boolean
    bulletsVi?: boolean
    bulletsEn?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "order" | "icon" | "titleVi" | "titleEn" | "subtitleVi" | "subtitleEn" | "descVi" | "descEn" | "tag" | "bulletsVi" | "bulletsEn" | "published" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      order: number
      icon: string
      titleVi: string
      titleEn: string
      subtitleVi: string
      subtitleEn: string
      descVi: string
      descEn: string
      tag: string
      bulletsVi: string[]
      bulletsEn: string[]
      published: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly slug: FieldRef<"Service", 'String'>
    readonly order: FieldRef<"Service", 'Int'>
    readonly icon: FieldRef<"Service", 'String'>
    readonly titleVi: FieldRef<"Service", 'String'>
    readonly titleEn: FieldRef<"Service", 'String'>
    readonly subtitleVi: FieldRef<"Service", 'String'>
    readonly subtitleEn: FieldRef<"Service", 'String'>
    readonly descVi: FieldRef<"Service", 'String'>
    readonly descEn: FieldRef<"Service", 'String'>
    readonly tag: FieldRef<"Service", 'String'>
    readonly bulletsVi: FieldRef<"Service", 'String[]'>
    readonly bulletsEn: FieldRef<"Service", 'String[]'>
    readonly published: FieldRef<"Service", 'Boolean'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
  }


  /**
   * Model NewsArticle
   */

  export type AggregateNewsArticle = {
    _count: NewsArticleCountAggregateOutputType | null
    _avg: NewsArticleAvgAggregateOutputType | null
    _sum: NewsArticleSumAggregateOutputType | null
    _min: NewsArticleMinAggregateOutputType | null
    _max: NewsArticleMaxAggregateOutputType | null
  }

  export type NewsArticleAvgAggregateOutputType = {
    readTime: number | null
  }

  export type NewsArticleSumAggregateOutputType = {
    readTime: number | null
  }

  export type NewsArticleMinAggregateOutputType = {
    id: string | null
    slug: string | null
    titleVi: string | null
    titleEn: string | null
    summaryVi: string | null
    summaryEn: string | null
    image: string | null
    categoryVi: string | null
    categoryEn: string | null
    date: string | null
    readTime: number | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsArticleMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    titleVi: string | null
    titleEn: string | null
    summaryVi: string | null
    summaryEn: string | null
    image: string | null
    categoryVi: string | null
    categoryEn: string | null
    date: string | null
    readTime: number | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsArticleCountAggregateOutputType = {
    id: number
    slug: number
    titleVi: number
    titleEn: number
    summaryVi: number
    summaryEn: number
    contentVi: number
    contentEn: number
    image: number
    categoryVi: number
    categoryEn: number
    date: number
    readTime: number
    published: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NewsArticleAvgAggregateInputType = {
    readTime?: true
  }

  export type NewsArticleSumAggregateInputType = {
    readTime?: true
  }

  export type NewsArticleMinAggregateInputType = {
    id?: true
    slug?: true
    titleVi?: true
    titleEn?: true
    summaryVi?: true
    summaryEn?: true
    image?: true
    categoryVi?: true
    categoryEn?: true
    date?: true
    readTime?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsArticleMaxAggregateInputType = {
    id?: true
    slug?: true
    titleVi?: true
    titleEn?: true
    summaryVi?: true
    summaryEn?: true
    image?: true
    categoryVi?: true
    categoryEn?: true
    date?: true
    readTime?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsArticleCountAggregateInputType = {
    id?: true
    slug?: true
    titleVi?: true
    titleEn?: true
    summaryVi?: true
    summaryEn?: true
    contentVi?: true
    contentEn?: true
    image?: true
    categoryVi?: true
    categoryEn?: true
    date?: true
    readTime?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NewsArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsArticle to aggregate.
     */
    where?: NewsArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsArticles to fetch.
     */
    orderBy?: NewsArticleOrderByWithRelationInput | NewsArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsArticles
    **/
    _count?: true | NewsArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NewsArticleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NewsArticleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsArticleMaxAggregateInputType
  }

  export type GetNewsArticleAggregateType<T extends NewsArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsArticle[P]>
      : GetScalarType<T[P], AggregateNewsArticle[P]>
  }




  export type NewsArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsArticleWhereInput
    orderBy?: NewsArticleOrderByWithAggregationInput | NewsArticleOrderByWithAggregationInput[]
    by: NewsArticleScalarFieldEnum[] | NewsArticleScalarFieldEnum
    having?: NewsArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsArticleCountAggregateInputType | true
    _avg?: NewsArticleAvgAggregateInputType
    _sum?: NewsArticleSumAggregateInputType
    _min?: NewsArticleMinAggregateInputType
    _max?: NewsArticleMaxAggregateInputType
  }

  export type NewsArticleGroupByOutputType = {
    id: string
    slug: string
    titleVi: string
    titleEn: string
    summaryVi: string
    summaryEn: string
    contentVi: string[]
    contentEn: string[]
    image: string
    categoryVi: string
    categoryEn: string
    date: string
    readTime: number
    published: boolean
    createdAt: Date
    updatedAt: Date
    _count: NewsArticleCountAggregateOutputType | null
    _avg: NewsArticleAvgAggregateOutputType | null
    _sum: NewsArticleSumAggregateOutputType | null
    _min: NewsArticleMinAggregateOutputType | null
    _max: NewsArticleMaxAggregateOutputType | null
  }

  type GetNewsArticleGroupByPayload<T extends NewsArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsArticleGroupByOutputType[P]>
            : GetScalarType<T[P], NewsArticleGroupByOutputType[P]>
        }
      >
    >


  export type NewsArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    titleVi?: boolean
    titleEn?: boolean
    summaryVi?: boolean
    summaryEn?: boolean
    contentVi?: boolean
    contentEn?: boolean
    image?: boolean
    categoryVi?: boolean
    categoryEn?: boolean
    date?: boolean
    readTime?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsArticle"]>

  export type NewsArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    titleVi?: boolean
    titleEn?: boolean
    summaryVi?: boolean
    summaryEn?: boolean
    contentVi?: boolean
    contentEn?: boolean
    image?: boolean
    categoryVi?: boolean
    categoryEn?: boolean
    date?: boolean
    readTime?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsArticle"]>

  export type NewsArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    titleVi?: boolean
    titleEn?: boolean
    summaryVi?: boolean
    summaryEn?: boolean
    contentVi?: boolean
    contentEn?: boolean
    image?: boolean
    categoryVi?: boolean
    categoryEn?: boolean
    date?: boolean
    readTime?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsArticle"]>

  export type NewsArticleSelectScalar = {
    id?: boolean
    slug?: boolean
    titleVi?: boolean
    titleEn?: boolean
    summaryVi?: boolean
    summaryEn?: boolean
    contentVi?: boolean
    contentEn?: boolean
    image?: boolean
    categoryVi?: boolean
    categoryEn?: boolean
    date?: boolean
    readTime?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NewsArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "titleVi" | "titleEn" | "summaryVi" | "summaryEn" | "contentVi" | "contentEn" | "image" | "categoryVi" | "categoryEn" | "date" | "readTime" | "published" | "createdAt" | "updatedAt", ExtArgs["result"]["newsArticle"]>

  export type $NewsArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsArticle"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      titleVi: string
      titleEn: string
      summaryVi: string
      summaryEn: string
      contentVi: string[]
      contentEn: string[]
      image: string
      categoryVi: string
      categoryEn: string
      date: string
      readTime: number
      published: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["newsArticle"]>
    composites: {}
  }

  type NewsArticleGetPayload<S extends boolean | null | undefined | NewsArticleDefaultArgs> = $Result.GetResult<Prisma.$NewsArticlePayload, S>

  type NewsArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsArticleCountAggregateInputType | true
    }

  export interface NewsArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsArticle'], meta: { name: 'NewsArticle' } }
    /**
     * Find zero or one NewsArticle that matches the filter.
     * @param {NewsArticleFindUniqueArgs} args - Arguments to find a NewsArticle
     * @example
     * // Get one NewsArticle
     * const newsArticle = await prisma.newsArticle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsArticleFindUniqueArgs>(args: SelectSubset<T, NewsArticleFindUniqueArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsArticle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsArticleFindUniqueOrThrowArgs} args - Arguments to find a NewsArticle
     * @example
     * // Get one NewsArticle
     * const newsArticle = await prisma.newsArticle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsArticle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleFindFirstArgs} args - Arguments to find a NewsArticle
     * @example
     * // Get one NewsArticle
     * const newsArticle = await prisma.newsArticle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsArticleFindFirstArgs>(args?: SelectSubset<T, NewsArticleFindFirstArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsArticle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleFindFirstOrThrowArgs} args - Arguments to find a NewsArticle
     * @example
     * // Get one NewsArticle
     * const newsArticle = await prisma.newsArticle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsArticles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsArticles
     * const newsArticles = await prisma.newsArticle.findMany()
     * 
     * // Get first 10 NewsArticles
     * const newsArticles = await prisma.newsArticle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsArticleWithIdOnly = await prisma.newsArticle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsArticleFindManyArgs>(args?: SelectSubset<T, NewsArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsArticle.
     * @param {NewsArticleCreateArgs} args - Arguments to create a NewsArticle.
     * @example
     * // Create one NewsArticle
     * const NewsArticle = await prisma.newsArticle.create({
     *   data: {
     *     // ... data to create a NewsArticle
     *   }
     * })
     * 
     */
    create<T extends NewsArticleCreateArgs>(args: SelectSubset<T, NewsArticleCreateArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsArticles.
     * @param {NewsArticleCreateManyArgs} args - Arguments to create many NewsArticles.
     * @example
     * // Create many NewsArticles
     * const newsArticle = await prisma.newsArticle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsArticleCreateManyArgs>(args?: SelectSubset<T, NewsArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsArticles and returns the data saved in the database.
     * @param {NewsArticleCreateManyAndReturnArgs} args - Arguments to create many NewsArticles.
     * @example
     * // Create many NewsArticles
     * const newsArticle = await prisma.newsArticle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsArticles and only return the `id`
     * const newsArticleWithIdOnly = await prisma.newsArticle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsArticle.
     * @param {NewsArticleDeleteArgs} args - Arguments to delete one NewsArticle.
     * @example
     * // Delete one NewsArticle
     * const NewsArticle = await prisma.newsArticle.delete({
     *   where: {
     *     // ... filter to delete one NewsArticle
     *   }
     * })
     * 
     */
    delete<T extends NewsArticleDeleteArgs>(args: SelectSubset<T, NewsArticleDeleteArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsArticle.
     * @param {NewsArticleUpdateArgs} args - Arguments to update one NewsArticle.
     * @example
     * // Update one NewsArticle
     * const newsArticle = await prisma.newsArticle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsArticleUpdateArgs>(args: SelectSubset<T, NewsArticleUpdateArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsArticles.
     * @param {NewsArticleDeleteManyArgs} args - Arguments to filter NewsArticles to delete.
     * @example
     * // Delete a few NewsArticles
     * const { count } = await prisma.newsArticle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsArticleDeleteManyArgs>(args?: SelectSubset<T, NewsArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsArticles
     * const newsArticle = await prisma.newsArticle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsArticleUpdateManyArgs>(args: SelectSubset<T, NewsArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsArticles and returns the data updated in the database.
     * @param {NewsArticleUpdateManyAndReturnArgs} args - Arguments to update many NewsArticles.
     * @example
     * // Update many NewsArticles
     * const newsArticle = await prisma.newsArticle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsArticles and only return the `id`
     * const newsArticleWithIdOnly = await prisma.newsArticle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NewsArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, NewsArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsArticle.
     * @param {NewsArticleUpsertArgs} args - Arguments to update or create a NewsArticle.
     * @example
     * // Update or create a NewsArticle
     * const newsArticle = await prisma.newsArticle.upsert({
     *   create: {
     *     // ... data to create a NewsArticle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsArticle we want to update
     *   }
     * })
     */
    upsert<T extends NewsArticleUpsertArgs>(args: SelectSubset<T, NewsArticleUpsertArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleCountArgs} args - Arguments to filter NewsArticles to count.
     * @example
     * // Count the number of NewsArticles
     * const count = await prisma.newsArticle.count({
     *   where: {
     *     // ... the filter for the NewsArticles we want to count
     *   }
     * })
    **/
    count<T extends NewsArticleCountArgs>(
      args?: Subset<T, NewsArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NewsArticleAggregateArgs>(args: Subset<T, NewsArticleAggregateArgs>): Prisma.PrismaPromise<GetNewsArticleAggregateType<T>>

    /**
     * Group by NewsArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NewsArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsArticleGroupByArgs['orderBy'] }
        : { orderBy?: NewsArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NewsArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsArticle model
   */
  readonly fields: NewsArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsArticle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NewsArticle model
   */
  interface NewsArticleFieldRefs {
    readonly id: FieldRef<"NewsArticle", 'String'>
    readonly slug: FieldRef<"NewsArticle", 'String'>
    readonly titleVi: FieldRef<"NewsArticle", 'String'>
    readonly titleEn: FieldRef<"NewsArticle", 'String'>
    readonly summaryVi: FieldRef<"NewsArticle", 'String'>
    readonly summaryEn: FieldRef<"NewsArticle", 'String'>
    readonly contentVi: FieldRef<"NewsArticle", 'String[]'>
    readonly contentEn: FieldRef<"NewsArticle", 'String[]'>
    readonly image: FieldRef<"NewsArticle", 'String'>
    readonly categoryVi: FieldRef<"NewsArticle", 'String'>
    readonly categoryEn: FieldRef<"NewsArticle", 'String'>
    readonly date: FieldRef<"NewsArticle", 'String'>
    readonly readTime: FieldRef<"NewsArticle", 'Int'>
    readonly published: FieldRef<"NewsArticle", 'Boolean'>
    readonly createdAt: FieldRef<"NewsArticle", 'DateTime'>
    readonly updatedAt: FieldRef<"NewsArticle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsArticle findUnique
   */
  export type NewsArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticle to fetch.
     */
    where: NewsArticleWhereUniqueInput
  }

  /**
   * NewsArticle findUniqueOrThrow
   */
  export type NewsArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticle to fetch.
     */
    where: NewsArticleWhereUniqueInput
  }

  /**
   * NewsArticle findFirst
   */
  export type NewsArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticle to fetch.
     */
    where?: NewsArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsArticles to fetch.
     */
    orderBy?: NewsArticleOrderByWithRelationInput | NewsArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsArticles.
     */
    cursor?: NewsArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsArticles.
     */
    distinct?: NewsArticleScalarFieldEnum | NewsArticleScalarFieldEnum[]
  }

  /**
   * NewsArticle findFirstOrThrow
   */
  export type NewsArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticle to fetch.
     */
    where?: NewsArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsArticles to fetch.
     */
    orderBy?: NewsArticleOrderByWithRelationInput | NewsArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsArticles.
     */
    cursor?: NewsArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsArticles.
     */
    distinct?: NewsArticleScalarFieldEnum | NewsArticleScalarFieldEnum[]
  }

  /**
   * NewsArticle findMany
   */
  export type NewsArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticles to fetch.
     */
    where?: NewsArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsArticles to fetch.
     */
    orderBy?: NewsArticleOrderByWithRelationInput | NewsArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsArticles.
     */
    cursor?: NewsArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsArticles.
     */
    distinct?: NewsArticleScalarFieldEnum | NewsArticleScalarFieldEnum[]
  }

  /**
   * NewsArticle create
   */
  export type NewsArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The data needed to create a NewsArticle.
     */
    data: XOR<NewsArticleCreateInput, NewsArticleUncheckedCreateInput>
  }

  /**
   * NewsArticle createMany
   */
  export type NewsArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsArticles.
     */
    data: NewsArticleCreateManyInput | NewsArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsArticle createManyAndReturn
   */
  export type NewsArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The data used to create many NewsArticles.
     */
    data: NewsArticleCreateManyInput | NewsArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsArticle update
   */
  export type NewsArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The data needed to update a NewsArticle.
     */
    data: XOR<NewsArticleUpdateInput, NewsArticleUncheckedUpdateInput>
    /**
     * Choose, which NewsArticle to update.
     */
    where: NewsArticleWhereUniqueInput
  }

  /**
   * NewsArticle updateMany
   */
  export type NewsArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsArticles.
     */
    data: XOR<NewsArticleUpdateManyMutationInput, NewsArticleUncheckedUpdateManyInput>
    /**
     * Filter which NewsArticles to update
     */
    where?: NewsArticleWhereInput
    /**
     * Limit how many NewsArticles to update.
     */
    limit?: number
  }

  /**
   * NewsArticle updateManyAndReturn
   */
  export type NewsArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The data used to update NewsArticles.
     */
    data: XOR<NewsArticleUpdateManyMutationInput, NewsArticleUncheckedUpdateManyInput>
    /**
     * Filter which NewsArticles to update
     */
    where?: NewsArticleWhereInput
    /**
     * Limit how many NewsArticles to update.
     */
    limit?: number
  }

  /**
   * NewsArticle upsert
   */
  export type NewsArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The filter to search for the NewsArticle to update in case it exists.
     */
    where: NewsArticleWhereUniqueInput
    /**
     * In case the NewsArticle found by the `where` argument doesn't exist, create a new NewsArticle with this data.
     */
    create: XOR<NewsArticleCreateInput, NewsArticleUncheckedCreateInput>
    /**
     * In case the NewsArticle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsArticleUpdateInput, NewsArticleUncheckedUpdateInput>
  }

  /**
   * NewsArticle delete
   */
  export type NewsArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter which NewsArticle to delete.
     */
    where: NewsArticleWhereUniqueInput
  }

  /**
   * NewsArticle deleteMany
   */
  export type NewsArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsArticles to delete
     */
    where?: NewsArticleWhereInput
    /**
     * Limit how many NewsArticles to delete.
     */
    limit?: number
  }

  /**
   * NewsArticle without action
   */
  export type NewsArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
  }


  /**
   * Model Partner
   */

  export type AggregatePartner = {
    _count: PartnerCountAggregateOutputType | null
    _avg: PartnerAvgAggregateOutputType | null
    _sum: PartnerSumAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  export type PartnerAvgAggregateOutputType = {
    order: number | null
    founded: number | null
  }

  export type PartnerSumAggregateOutputType = {
    order: number | null
    founded: number | null
  }

  export type PartnerMinAggregateOutputType = {
    id: string | null
    order: number | null
    name: string | null
    sectorVi: string | null
    sectorEn: string | null
    descVi: string | null
    descEn: string | null
    founded: number | null
    hq: string | null
    statLabelVi: string | null
    statLabelEn: string | null
    statValue: string | null
    highlightVi: string | null
    highlightEn: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerMaxAggregateOutputType = {
    id: string | null
    order: number | null
    name: string | null
    sectorVi: string | null
    sectorEn: string | null
    descVi: string | null
    descEn: string | null
    founded: number | null
    hq: string | null
    statLabelVi: string | null
    statLabelEn: string | null
    statValue: string | null
    highlightVi: string | null
    highlightEn: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerCountAggregateOutputType = {
    id: number
    order: number
    name: number
    sectorVi: number
    sectorEn: number
    descVi: number
    descEn: number
    founded: number
    hq: number
    statLabelVi: number
    statLabelEn: number
    statValue: number
    projectsVi: number
    projectsEn: number
    highlightVi: number
    highlightEn: number
    published: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartnerAvgAggregateInputType = {
    order?: true
    founded?: true
  }

  export type PartnerSumAggregateInputType = {
    order?: true
    founded?: true
  }

  export type PartnerMinAggregateInputType = {
    id?: true
    order?: true
    name?: true
    sectorVi?: true
    sectorEn?: true
    descVi?: true
    descEn?: true
    founded?: true
    hq?: true
    statLabelVi?: true
    statLabelEn?: true
    statValue?: true
    highlightVi?: true
    highlightEn?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerMaxAggregateInputType = {
    id?: true
    order?: true
    name?: true
    sectorVi?: true
    sectorEn?: true
    descVi?: true
    descEn?: true
    founded?: true
    hq?: true
    statLabelVi?: true
    statLabelEn?: true
    statValue?: true
    highlightVi?: true
    highlightEn?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerCountAggregateInputType = {
    id?: true
    order?: true
    name?: true
    sectorVi?: true
    sectorEn?: true
    descVi?: true
    descEn?: true
    founded?: true
    hq?: true
    statLabelVi?: true
    statLabelEn?: true
    statValue?: true
    projectsVi?: true
    projectsEn?: true
    highlightVi?: true
    highlightEn?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partner to aggregate.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Partners
    **/
    _count?: true | PartnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartnerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartnerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartnerMaxAggregateInputType
  }

  export type GetPartnerAggregateType<T extends PartnerAggregateArgs> = {
        [P in keyof T & keyof AggregatePartner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartner[P]>
      : GetScalarType<T[P], AggregatePartner[P]>
  }




  export type PartnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnerWhereInput
    orderBy?: PartnerOrderByWithAggregationInput | PartnerOrderByWithAggregationInput[]
    by: PartnerScalarFieldEnum[] | PartnerScalarFieldEnum
    having?: PartnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartnerCountAggregateInputType | true
    _avg?: PartnerAvgAggregateInputType
    _sum?: PartnerSumAggregateInputType
    _min?: PartnerMinAggregateInputType
    _max?: PartnerMaxAggregateInputType
  }

  export type PartnerGroupByOutputType = {
    id: string
    order: number
    name: string
    sectorVi: string
    sectorEn: string
    descVi: string
    descEn: string
    founded: number
    hq: string
    statLabelVi: string
    statLabelEn: string
    statValue: string
    projectsVi: string[]
    projectsEn: string[]
    highlightVi: string
    highlightEn: string
    published: boolean
    createdAt: Date
    updatedAt: Date
    _count: PartnerCountAggregateOutputType | null
    _avg: PartnerAvgAggregateOutputType | null
    _sum: PartnerSumAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  type GetPartnerGroupByPayload<T extends PartnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartnerGroupByOutputType[P]>
            : GetScalarType<T[P], PartnerGroupByOutputType[P]>
        }
      >
    >


  export type PartnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    name?: boolean
    sectorVi?: boolean
    sectorEn?: boolean
    descVi?: boolean
    descEn?: boolean
    founded?: boolean
    hq?: boolean
    statLabelVi?: boolean
    statLabelEn?: boolean
    statValue?: boolean
    projectsVi?: boolean
    projectsEn?: boolean
    highlightVi?: boolean
    highlightEn?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    name?: boolean
    sectorVi?: boolean
    sectorEn?: boolean
    descVi?: boolean
    descEn?: boolean
    founded?: boolean
    hq?: boolean
    statLabelVi?: boolean
    statLabelEn?: boolean
    statValue?: boolean
    projectsVi?: boolean
    projectsEn?: boolean
    highlightVi?: boolean
    highlightEn?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    name?: boolean
    sectorVi?: boolean
    sectorEn?: boolean
    descVi?: boolean
    descEn?: boolean
    founded?: boolean
    hq?: boolean
    statLabelVi?: boolean
    statLabelEn?: boolean
    statValue?: boolean
    projectsVi?: boolean
    projectsEn?: boolean
    highlightVi?: boolean
    highlightEn?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectScalar = {
    id?: boolean
    order?: boolean
    name?: boolean
    sectorVi?: boolean
    sectorEn?: boolean
    descVi?: boolean
    descEn?: boolean
    founded?: boolean
    hq?: boolean
    statLabelVi?: boolean
    statLabelEn?: boolean
    statValue?: boolean
    projectsVi?: boolean
    projectsEn?: boolean
    highlightVi?: boolean
    highlightEn?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartnerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "order" | "name" | "sectorVi" | "sectorEn" | "descVi" | "descEn" | "founded" | "hq" | "statLabelVi" | "statLabelEn" | "statValue" | "projectsVi" | "projectsEn" | "highlightVi" | "highlightEn" | "published" | "createdAt" | "updatedAt", ExtArgs["result"]["partner"]>

  export type $PartnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Partner"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      order: number
      name: string
      sectorVi: string
      sectorEn: string
      descVi: string
      descEn: string
      founded: number
      hq: string
      statLabelVi: string
      statLabelEn: string
      statValue: string
      projectsVi: string[]
      projectsEn: string[]
      highlightVi: string
      highlightEn: string
      published: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["partner"]>
    composites: {}
  }

  type PartnerGetPayload<S extends boolean | null | undefined | PartnerDefaultArgs> = $Result.GetResult<Prisma.$PartnerPayload, S>

  type PartnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartnerCountAggregateInputType | true
    }

  export interface PartnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Partner'], meta: { name: 'Partner' } }
    /**
     * Find zero or one Partner that matches the filter.
     * @param {PartnerFindUniqueArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartnerFindUniqueArgs>(args: SelectSubset<T, PartnerFindUniqueArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Partner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartnerFindUniqueOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartnerFindUniqueOrThrowArgs>(args: SelectSubset<T, PartnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Partner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartnerFindFirstArgs>(args?: SelectSubset<T, PartnerFindFirstArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Partner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartnerFindFirstOrThrowArgs>(args?: SelectSubset<T, PartnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Partners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Partners
     * const partners = await prisma.partner.findMany()
     * 
     * // Get first 10 Partners
     * const partners = await prisma.partner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partnerWithIdOnly = await prisma.partner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartnerFindManyArgs>(args?: SelectSubset<T, PartnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Partner.
     * @param {PartnerCreateArgs} args - Arguments to create a Partner.
     * @example
     * // Create one Partner
     * const Partner = await prisma.partner.create({
     *   data: {
     *     // ... data to create a Partner
     *   }
     * })
     * 
     */
    create<T extends PartnerCreateArgs>(args: SelectSubset<T, PartnerCreateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Partners.
     * @param {PartnerCreateManyArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartnerCreateManyArgs>(args?: SelectSubset<T, PartnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Partners and returns the data saved in the database.
     * @param {PartnerCreateManyAndReturnArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Partners and only return the `id`
     * const partnerWithIdOnly = await prisma.partner.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartnerCreateManyAndReturnArgs>(args?: SelectSubset<T, PartnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Partner.
     * @param {PartnerDeleteArgs} args - Arguments to delete one Partner.
     * @example
     * // Delete one Partner
     * const Partner = await prisma.partner.delete({
     *   where: {
     *     // ... filter to delete one Partner
     *   }
     * })
     * 
     */
    delete<T extends PartnerDeleteArgs>(args: SelectSubset<T, PartnerDeleteArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Partner.
     * @param {PartnerUpdateArgs} args - Arguments to update one Partner.
     * @example
     * // Update one Partner
     * const partner = await prisma.partner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartnerUpdateArgs>(args: SelectSubset<T, PartnerUpdateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Partners.
     * @param {PartnerDeleteManyArgs} args - Arguments to filter Partners to delete.
     * @example
     * // Delete a few Partners
     * const { count } = await prisma.partner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartnerDeleteManyArgs>(args?: SelectSubset<T, PartnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Partners
     * const partner = await prisma.partner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartnerUpdateManyArgs>(args: SelectSubset<T, PartnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partners and returns the data updated in the database.
     * @param {PartnerUpdateManyAndReturnArgs} args - Arguments to update many Partners.
     * @example
     * // Update many Partners
     * const partner = await prisma.partner.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Partners and only return the `id`
     * const partnerWithIdOnly = await prisma.partner.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PartnerUpdateManyAndReturnArgs>(args: SelectSubset<T, PartnerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Partner.
     * @param {PartnerUpsertArgs} args - Arguments to update or create a Partner.
     * @example
     * // Update or create a Partner
     * const partner = await prisma.partner.upsert({
     *   create: {
     *     // ... data to create a Partner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Partner we want to update
     *   }
     * })
     */
    upsert<T extends PartnerUpsertArgs>(args: SelectSubset<T, PartnerUpsertArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerCountArgs} args - Arguments to filter Partners to count.
     * @example
     * // Count the number of Partners
     * const count = await prisma.partner.count({
     *   where: {
     *     // ... the filter for the Partners we want to count
     *   }
     * })
    **/
    count<T extends PartnerCountArgs>(
      args?: Subset<T, PartnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartnerAggregateArgs>(args: Subset<T, PartnerAggregateArgs>): Prisma.PrismaPromise<GetPartnerAggregateType<T>>

    /**
     * Group by Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartnerGroupByArgs['orderBy'] }
        : { orderBy?: PartnerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Partner model
   */
  readonly fields: PartnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Partner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Partner model
   */
  interface PartnerFieldRefs {
    readonly id: FieldRef<"Partner", 'String'>
    readonly order: FieldRef<"Partner", 'Int'>
    readonly name: FieldRef<"Partner", 'String'>
    readonly sectorVi: FieldRef<"Partner", 'String'>
    readonly sectorEn: FieldRef<"Partner", 'String'>
    readonly descVi: FieldRef<"Partner", 'String'>
    readonly descEn: FieldRef<"Partner", 'String'>
    readonly founded: FieldRef<"Partner", 'Int'>
    readonly hq: FieldRef<"Partner", 'String'>
    readonly statLabelVi: FieldRef<"Partner", 'String'>
    readonly statLabelEn: FieldRef<"Partner", 'String'>
    readonly statValue: FieldRef<"Partner", 'String'>
    readonly projectsVi: FieldRef<"Partner", 'String[]'>
    readonly projectsEn: FieldRef<"Partner", 'String[]'>
    readonly highlightVi: FieldRef<"Partner", 'String'>
    readonly highlightEn: FieldRef<"Partner", 'String'>
    readonly published: FieldRef<"Partner", 'Boolean'>
    readonly createdAt: FieldRef<"Partner", 'DateTime'>
    readonly updatedAt: FieldRef<"Partner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Partner findUnique
   */
  export type PartnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findUniqueOrThrow
   */
  export type PartnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findFirst
   */
  export type PartnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findFirstOrThrow
   */
  export type PartnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findMany
   */
  export type PartnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Filter, which Partners to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner create
   */
  export type PartnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The data needed to create a Partner.
     */
    data: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
  }

  /**
   * Partner createMany
   */
  export type PartnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Partner createManyAndReturn
   */
  export type PartnerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Partner update
   */
  export type PartnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The data needed to update a Partner.
     */
    data: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
    /**
     * Choose, which Partner to update.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner updateMany
   */
  export type PartnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Partners.
     */
    data: XOR<PartnerUpdateManyMutationInput, PartnerUncheckedUpdateManyInput>
    /**
     * Filter which Partners to update
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to update.
     */
    limit?: number
  }

  /**
   * Partner updateManyAndReturn
   */
  export type PartnerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The data used to update Partners.
     */
    data: XOR<PartnerUpdateManyMutationInput, PartnerUncheckedUpdateManyInput>
    /**
     * Filter which Partners to update
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to update.
     */
    limit?: number
  }

  /**
   * Partner upsert
   */
  export type PartnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The filter to search for the Partner to update in case it exists.
     */
    where: PartnerWhereUniqueInput
    /**
     * In case the Partner found by the `where` argument doesn't exist, create a new Partner with this data.
     */
    create: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
    /**
     * In case the Partner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
  }

  /**
   * Partner delete
   */
  export type PartnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Filter which Partner to delete.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner deleteMany
   */
  export type PartnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partners to delete
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to delete.
     */
    limit?: number
  }

  /**
   * Partner without action
   */
  export type PartnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
  }


  /**
   * Model TimelineItem
   */

  export type AggregateTimelineItem = {
    _count: TimelineItemCountAggregateOutputType | null
    _avg: TimelineItemAvgAggregateOutputType | null
    _sum: TimelineItemSumAggregateOutputType | null
    _min: TimelineItemMinAggregateOutputType | null
    _max: TimelineItemMaxAggregateOutputType | null
  }

  export type TimelineItemAvgAggregateOutputType = {
    order: number | null
  }

  export type TimelineItemSumAggregateOutputType = {
    order: number | null
  }

  export type TimelineItemMinAggregateOutputType = {
    id: string | null
    order: number | null
    year: string | null
    titleVi: string | null
    titleEn: string | null
    descVi: string | null
    descEn: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TimelineItemMaxAggregateOutputType = {
    id: string | null
    order: number | null
    year: string | null
    titleVi: string | null
    titleEn: string | null
    descVi: string | null
    descEn: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TimelineItemCountAggregateOutputType = {
    id: number
    order: number
    year: number
    titleVi: number
    titleEn: number
    descVi: number
    descEn: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TimelineItemAvgAggregateInputType = {
    order?: true
  }

  export type TimelineItemSumAggregateInputType = {
    order?: true
  }

  export type TimelineItemMinAggregateInputType = {
    id?: true
    order?: true
    year?: true
    titleVi?: true
    titleEn?: true
    descVi?: true
    descEn?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TimelineItemMaxAggregateInputType = {
    id?: true
    order?: true
    year?: true
    titleVi?: true
    titleEn?: true
    descVi?: true
    descEn?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TimelineItemCountAggregateInputType = {
    id?: true
    order?: true
    year?: true
    titleVi?: true
    titleEn?: true
    descVi?: true
    descEn?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TimelineItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimelineItem to aggregate.
     */
    where?: TimelineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineItems to fetch.
     */
    orderBy?: TimelineItemOrderByWithRelationInput | TimelineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimelineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimelineItems
    **/
    _count?: true | TimelineItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimelineItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimelineItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimelineItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimelineItemMaxAggregateInputType
  }

  export type GetTimelineItemAggregateType<T extends TimelineItemAggregateArgs> = {
        [P in keyof T & keyof AggregateTimelineItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimelineItem[P]>
      : GetScalarType<T[P], AggregateTimelineItem[P]>
  }




  export type TimelineItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimelineItemWhereInput
    orderBy?: TimelineItemOrderByWithAggregationInput | TimelineItemOrderByWithAggregationInput[]
    by: TimelineItemScalarFieldEnum[] | TimelineItemScalarFieldEnum
    having?: TimelineItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimelineItemCountAggregateInputType | true
    _avg?: TimelineItemAvgAggregateInputType
    _sum?: TimelineItemSumAggregateInputType
    _min?: TimelineItemMinAggregateInputType
    _max?: TimelineItemMaxAggregateInputType
  }

  export type TimelineItemGroupByOutputType = {
    id: string
    order: number
    year: string
    titleVi: string
    titleEn: string
    descVi: string
    descEn: string
    createdAt: Date
    updatedAt: Date
    _count: TimelineItemCountAggregateOutputType | null
    _avg: TimelineItemAvgAggregateOutputType | null
    _sum: TimelineItemSumAggregateOutputType | null
    _min: TimelineItemMinAggregateOutputType | null
    _max: TimelineItemMaxAggregateOutputType | null
  }

  type GetTimelineItemGroupByPayload<T extends TimelineItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimelineItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimelineItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimelineItemGroupByOutputType[P]>
            : GetScalarType<T[P], TimelineItemGroupByOutputType[P]>
        }
      >
    >


  export type TimelineItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    year?: boolean
    titleVi?: boolean
    titleEn?: boolean
    descVi?: boolean
    descEn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["timelineItem"]>

  export type TimelineItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    year?: boolean
    titleVi?: boolean
    titleEn?: boolean
    descVi?: boolean
    descEn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["timelineItem"]>

  export type TimelineItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    year?: boolean
    titleVi?: boolean
    titleEn?: boolean
    descVi?: boolean
    descEn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["timelineItem"]>

  export type TimelineItemSelectScalar = {
    id?: boolean
    order?: boolean
    year?: boolean
    titleVi?: boolean
    titleEn?: boolean
    descVi?: boolean
    descEn?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TimelineItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "order" | "year" | "titleVi" | "titleEn" | "descVi" | "descEn" | "createdAt" | "updatedAt", ExtArgs["result"]["timelineItem"]>

  export type $TimelineItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimelineItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      order: number
      year: string
      titleVi: string
      titleEn: string
      descVi: string
      descEn: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["timelineItem"]>
    composites: {}
  }

  type TimelineItemGetPayload<S extends boolean | null | undefined | TimelineItemDefaultArgs> = $Result.GetResult<Prisma.$TimelineItemPayload, S>

  type TimelineItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimelineItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimelineItemCountAggregateInputType | true
    }

  export interface TimelineItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimelineItem'], meta: { name: 'TimelineItem' } }
    /**
     * Find zero or one TimelineItem that matches the filter.
     * @param {TimelineItemFindUniqueArgs} args - Arguments to find a TimelineItem
     * @example
     * // Get one TimelineItem
     * const timelineItem = await prisma.timelineItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimelineItemFindUniqueArgs>(args: SelectSubset<T, TimelineItemFindUniqueArgs<ExtArgs>>): Prisma__TimelineItemClient<$Result.GetResult<Prisma.$TimelineItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimelineItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimelineItemFindUniqueOrThrowArgs} args - Arguments to find a TimelineItem
     * @example
     * // Get one TimelineItem
     * const timelineItem = await prisma.timelineItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimelineItemFindUniqueOrThrowArgs>(args: SelectSubset<T, TimelineItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimelineItemClient<$Result.GetResult<Prisma.$TimelineItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimelineItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineItemFindFirstArgs} args - Arguments to find a TimelineItem
     * @example
     * // Get one TimelineItem
     * const timelineItem = await prisma.timelineItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimelineItemFindFirstArgs>(args?: SelectSubset<T, TimelineItemFindFirstArgs<ExtArgs>>): Prisma__TimelineItemClient<$Result.GetResult<Prisma.$TimelineItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimelineItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineItemFindFirstOrThrowArgs} args - Arguments to find a TimelineItem
     * @example
     * // Get one TimelineItem
     * const timelineItem = await prisma.timelineItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimelineItemFindFirstOrThrowArgs>(args?: SelectSubset<T, TimelineItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimelineItemClient<$Result.GetResult<Prisma.$TimelineItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimelineItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimelineItems
     * const timelineItems = await prisma.timelineItem.findMany()
     * 
     * // Get first 10 TimelineItems
     * const timelineItems = await prisma.timelineItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timelineItemWithIdOnly = await prisma.timelineItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimelineItemFindManyArgs>(args?: SelectSubset<T, TimelineItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimelineItem.
     * @param {TimelineItemCreateArgs} args - Arguments to create a TimelineItem.
     * @example
     * // Create one TimelineItem
     * const TimelineItem = await prisma.timelineItem.create({
     *   data: {
     *     // ... data to create a TimelineItem
     *   }
     * })
     * 
     */
    create<T extends TimelineItemCreateArgs>(args: SelectSubset<T, TimelineItemCreateArgs<ExtArgs>>): Prisma__TimelineItemClient<$Result.GetResult<Prisma.$TimelineItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimelineItems.
     * @param {TimelineItemCreateManyArgs} args - Arguments to create many TimelineItems.
     * @example
     * // Create many TimelineItems
     * const timelineItem = await prisma.timelineItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimelineItemCreateManyArgs>(args?: SelectSubset<T, TimelineItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimelineItems and returns the data saved in the database.
     * @param {TimelineItemCreateManyAndReturnArgs} args - Arguments to create many TimelineItems.
     * @example
     * // Create many TimelineItems
     * const timelineItem = await prisma.timelineItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimelineItems and only return the `id`
     * const timelineItemWithIdOnly = await prisma.timelineItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimelineItemCreateManyAndReturnArgs>(args?: SelectSubset<T, TimelineItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimelineItem.
     * @param {TimelineItemDeleteArgs} args - Arguments to delete one TimelineItem.
     * @example
     * // Delete one TimelineItem
     * const TimelineItem = await prisma.timelineItem.delete({
     *   where: {
     *     // ... filter to delete one TimelineItem
     *   }
     * })
     * 
     */
    delete<T extends TimelineItemDeleteArgs>(args: SelectSubset<T, TimelineItemDeleteArgs<ExtArgs>>): Prisma__TimelineItemClient<$Result.GetResult<Prisma.$TimelineItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimelineItem.
     * @param {TimelineItemUpdateArgs} args - Arguments to update one TimelineItem.
     * @example
     * // Update one TimelineItem
     * const timelineItem = await prisma.timelineItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimelineItemUpdateArgs>(args: SelectSubset<T, TimelineItemUpdateArgs<ExtArgs>>): Prisma__TimelineItemClient<$Result.GetResult<Prisma.$TimelineItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimelineItems.
     * @param {TimelineItemDeleteManyArgs} args - Arguments to filter TimelineItems to delete.
     * @example
     * // Delete a few TimelineItems
     * const { count } = await prisma.timelineItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimelineItemDeleteManyArgs>(args?: SelectSubset<T, TimelineItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimelineItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimelineItems
     * const timelineItem = await prisma.timelineItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimelineItemUpdateManyArgs>(args: SelectSubset<T, TimelineItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimelineItems and returns the data updated in the database.
     * @param {TimelineItemUpdateManyAndReturnArgs} args - Arguments to update many TimelineItems.
     * @example
     * // Update many TimelineItems
     * const timelineItem = await prisma.timelineItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimelineItems and only return the `id`
     * const timelineItemWithIdOnly = await prisma.timelineItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimelineItemUpdateManyAndReturnArgs>(args: SelectSubset<T, TimelineItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimelineItem.
     * @param {TimelineItemUpsertArgs} args - Arguments to update or create a TimelineItem.
     * @example
     * // Update or create a TimelineItem
     * const timelineItem = await prisma.timelineItem.upsert({
     *   create: {
     *     // ... data to create a TimelineItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimelineItem we want to update
     *   }
     * })
     */
    upsert<T extends TimelineItemUpsertArgs>(args: SelectSubset<T, TimelineItemUpsertArgs<ExtArgs>>): Prisma__TimelineItemClient<$Result.GetResult<Prisma.$TimelineItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimelineItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineItemCountArgs} args - Arguments to filter TimelineItems to count.
     * @example
     * // Count the number of TimelineItems
     * const count = await prisma.timelineItem.count({
     *   where: {
     *     // ... the filter for the TimelineItems we want to count
     *   }
     * })
    **/
    count<T extends TimelineItemCountArgs>(
      args?: Subset<T, TimelineItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimelineItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimelineItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimelineItemAggregateArgs>(args: Subset<T, TimelineItemAggregateArgs>): Prisma.PrismaPromise<GetTimelineItemAggregateType<T>>

    /**
     * Group by TimelineItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimelineItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimelineItemGroupByArgs['orderBy'] }
        : { orderBy?: TimelineItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimelineItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimelineItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimelineItem model
   */
  readonly fields: TimelineItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimelineItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimelineItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimelineItem model
   */
  interface TimelineItemFieldRefs {
    readonly id: FieldRef<"TimelineItem", 'String'>
    readonly order: FieldRef<"TimelineItem", 'Int'>
    readonly year: FieldRef<"TimelineItem", 'String'>
    readonly titleVi: FieldRef<"TimelineItem", 'String'>
    readonly titleEn: FieldRef<"TimelineItem", 'String'>
    readonly descVi: FieldRef<"TimelineItem", 'String'>
    readonly descEn: FieldRef<"TimelineItem", 'String'>
    readonly createdAt: FieldRef<"TimelineItem", 'DateTime'>
    readonly updatedAt: FieldRef<"TimelineItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TimelineItem findUnique
   */
  export type TimelineItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineItem
     */
    select?: TimelineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineItem
     */
    omit?: TimelineItemOmit<ExtArgs> | null
    /**
     * Filter, which TimelineItem to fetch.
     */
    where: TimelineItemWhereUniqueInput
  }

  /**
   * TimelineItem findUniqueOrThrow
   */
  export type TimelineItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineItem
     */
    select?: TimelineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineItem
     */
    omit?: TimelineItemOmit<ExtArgs> | null
    /**
     * Filter, which TimelineItem to fetch.
     */
    where: TimelineItemWhereUniqueInput
  }

  /**
   * TimelineItem findFirst
   */
  export type TimelineItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineItem
     */
    select?: TimelineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineItem
     */
    omit?: TimelineItemOmit<ExtArgs> | null
    /**
     * Filter, which TimelineItem to fetch.
     */
    where?: TimelineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineItems to fetch.
     */
    orderBy?: TimelineItemOrderByWithRelationInput | TimelineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimelineItems.
     */
    cursor?: TimelineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineItems.
     */
    distinct?: TimelineItemScalarFieldEnum | TimelineItemScalarFieldEnum[]
  }

  /**
   * TimelineItem findFirstOrThrow
   */
  export type TimelineItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineItem
     */
    select?: TimelineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineItem
     */
    omit?: TimelineItemOmit<ExtArgs> | null
    /**
     * Filter, which TimelineItem to fetch.
     */
    where?: TimelineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineItems to fetch.
     */
    orderBy?: TimelineItemOrderByWithRelationInput | TimelineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimelineItems.
     */
    cursor?: TimelineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineItems.
     */
    distinct?: TimelineItemScalarFieldEnum | TimelineItemScalarFieldEnum[]
  }

  /**
   * TimelineItem findMany
   */
  export type TimelineItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineItem
     */
    select?: TimelineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineItem
     */
    omit?: TimelineItemOmit<ExtArgs> | null
    /**
     * Filter, which TimelineItems to fetch.
     */
    where?: TimelineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineItems to fetch.
     */
    orderBy?: TimelineItemOrderByWithRelationInput | TimelineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimelineItems.
     */
    cursor?: TimelineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineItems.
     */
    distinct?: TimelineItemScalarFieldEnum | TimelineItemScalarFieldEnum[]
  }

  /**
   * TimelineItem create
   */
  export type TimelineItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineItem
     */
    select?: TimelineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineItem
     */
    omit?: TimelineItemOmit<ExtArgs> | null
    /**
     * The data needed to create a TimelineItem.
     */
    data: XOR<TimelineItemCreateInput, TimelineItemUncheckedCreateInput>
  }

  /**
   * TimelineItem createMany
   */
  export type TimelineItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimelineItems.
     */
    data: TimelineItemCreateManyInput | TimelineItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimelineItem createManyAndReturn
   */
  export type TimelineItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineItem
     */
    select?: TimelineItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineItem
     */
    omit?: TimelineItemOmit<ExtArgs> | null
    /**
     * The data used to create many TimelineItems.
     */
    data: TimelineItemCreateManyInput | TimelineItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimelineItem update
   */
  export type TimelineItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineItem
     */
    select?: TimelineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineItem
     */
    omit?: TimelineItemOmit<ExtArgs> | null
    /**
     * The data needed to update a TimelineItem.
     */
    data: XOR<TimelineItemUpdateInput, TimelineItemUncheckedUpdateInput>
    /**
     * Choose, which TimelineItem to update.
     */
    where: TimelineItemWhereUniqueInput
  }

  /**
   * TimelineItem updateMany
   */
  export type TimelineItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimelineItems.
     */
    data: XOR<TimelineItemUpdateManyMutationInput, TimelineItemUncheckedUpdateManyInput>
    /**
     * Filter which TimelineItems to update
     */
    where?: TimelineItemWhereInput
    /**
     * Limit how many TimelineItems to update.
     */
    limit?: number
  }

  /**
   * TimelineItem updateManyAndReturn
   */
  export type TimelineItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineItem
     */
    select?: TimelineItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineItem
     */
    omit?: TimelineItemOmit<ExtArgs> | null
    /**
     * The data used to update TimelineItems.
     */
    data: XOR<TimelineItemUpdateManyMutationInput, TimelineItemUncheckedUpdateManyInput>
    /**
     * Filter which TimelineItems to update
     */
    where?: TimelineItemWhereInput
    /**
     * Limit how many TimelineItems to update.
     */
    limit?: number
  }

  /**
   * TimelineItem upsert
   */
  export type TimelineItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineItem
     */
    select?: TimelineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineItem
     */
    omit?: TimelineItemOmit<ExtArgs> | null
    /**
     * The filter to search for the TimelineItem to update in case it exists.
     */
    where: TimelineItemWhereUniqueInput
    /**
     * In case the TimelineItem found by the `where` argument doesn't exist, create a new TimelineItem with this data.
     */
    create: XOR<TimelineItemCreateInput, TimelineItemUncheckedCreateInput>
    /**
     * In case the TimelineItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimelineItemUpdateInput, TimelineItemUncheckedUpdateInput>
  }

  /**
   * TimelineItem delete
   */
  export type TimelineItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineItem
     */
    select?: TimelineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineItem
     */
    omit?: TimelineItemOmit<ExtArgs> | null
    /**
     * Filter which TimelineItem to delete.
     */
    where: TimelineItemWhereUniqueInput
  }

  /**
   * TimelineItem deleteMany
   */
  export type TimelineItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimelineItems to delete
     */
    where?: TimelineItemWhereInput
    /**
     * Limit how many TimelineItems to delete.
     */
    limit?: number
  }

  /**
   * TimelineItem without action
   */
  export type TimelineItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineItem
     */
    select?: TimelineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineItem
     */
    omit?: TimelineItemOmit<ExtArgs> | null
  }


  /**
   * Model MemberCompany
   */

  export type AggregateMemberCompany = {
    _count: MemberCompanyCountAggregateOutputType | null
    _avg: MemberCompanyAvgAggregateOutputType | null
    _sum: MemberCompanySumAggregateOutputType | null
    _min: MemberCompanyMinAggregateOutputType | null
    _max: MemberCompanyMaxAggregateOutputType | null
  }

  export type MemberCompanyAvgAggregateOutputType = {
    order: number | null
  }

  export type MemberCompanySumAggregateOutputType = {
    order: number | null
  }

  export type MemberCompanyMinAggregateOutputType = {
    id: string | null
    order: number | null
    abbr: string | null
    name: string | null
    tagline: string | null
    descVi: string | null
    descEn: string | null
    accent: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberCompanyMaxAggregateOutputType = {
    id: string | null
    order: number | null
    abbr: string | null
    name: string | null
    tagline: string | null
    descVi: string | null
    descEn: string | null
    accent: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberCompanyCountAggregateOutputType = {
    id: number
    order: number
    abbr: number
    name: number
    tagline: number
    descVi: number
    descEn: number
    accent: number
    published: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberCompanyAvgAggregateInputType = {
    order?: true
  }

  export type MemberCompanySumAggregateInputType = {
    order?: true
  }

  export type MemberCompanyMinAggregateInputType = {
    id?: true
    order?: true
    abbr?: true
    name?: true
    tagline?: true
    descVi?: true
    descEn?: true
    accent?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberCompanyMaxAggregateInputType = {
    id?: true
    order?: true
    abbr?: true
    name?: true
    tagline?: true
    descVi?: true
    descEn?: true
    accent?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberCompanyCountAggregateInputType = {
    id?: true
    order?: true
    abbr?: true
    name?: true
    tagline?: true
    descVi?: true
    descEn?: true
    accent?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberCompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberCompany to aggregate.
     */
    where?: MemberCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberCompanies to fetch.
     */
    orderBy?: MemberCompanyOrderByWithRelationInput | MemberCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemberCompanies
    **/
    _count?: true | MemberCompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemberCompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemberCompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberCompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberCompanyMaxAggregateInputType
  }

  export type GetMemberCompanyAggregateType<T extends MemberCompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateMemberCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemberCompany[P]>
      : GetScalarType<T[P], AggregateMemberCompany[P]>
  }




  export type MemberCompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberCompanyWhereInput
    orderBy?: MemberCompanyOrderByWithAggregationInput | MemberCompanyOrderByWithAggregationInput[]
    by: MemberCompanyScalarFieldEnum[] | MemberCompanyScalarFieldEnum
    having?: MemberCompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberCompanyCountAggregateInputType | true
    _avg?: MemberCompanyAvgAggregateInputType
    _sum?: MemberCompanySumAggregateInputType
    _min?: MemberCompanyMinAggregateInputType
    _max?: MemberCompanyMaxAggregateInputType
  }

  export type MemberCompanyGroupByOutputType = {
    id: string
    order: number
    abbr: string
    name: string
    tagline: string
    descVi: string
    descEn: string
    accent: string
    published: boolean
    createdAt: Date
    updatedAt: Date
    _count: MemberCompanyCountAggregateOutputType | null
    _avg: MemberCompanyAvgAggregateOutputType | null
    _sum: MemberCompanySumAggregateOutputType | null
    _min: MemberCompanyMinAggregateOutputType | null
    _max: MemberCompanyMaxAggregateOutputType | null
  }

  type GetMemberCompanyGroupByPayload<T extends MemberCompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberCompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberCompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberCompanyGroupByOutputType[P]>
            : GetScalarType<T[P], MemberCompanyGroupByOutputType[P]>
        }
      >
    >


  export type MemberCompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    abbr?: boolean
    name?: boolean
    tagline?: boolean
    descVi?: boolean
    descEn?: boolean
    accent?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["memberCompany"]>

  export type MemberCompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    abbr?: boolean
    name?: boolean
    tagline?: boolean
    descVi?: boolean
    descEn?: boolean
    accent?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["memberCompany"]>

  export type MemberCompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    abbr?: boolean
    name?: boolean
    tagline?: boolean
    descVi?: boolean
    descEn?: boolean
    accent?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["memberCompany"]>

  export type MemberCompanySelectScalar = {
    id?: boolean
    order?: boolean
    abbr?: boolean
    name?: boolean
    tagline?: boolean
    descVi?: boolean
    descEn?: boolean
    accent?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberCompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "order" | "abbr" | "name" | "tagline" | "descVi" | "descEn" | "accent" | "published" | "createdAt" | "updatedAt", ExtArgs["result"]["memberCompany"]>

  export type $MemberCompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemberCompany"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      order: number
      abbr: string
      name: string
      tagline: string
      descVi: string
      descEn: string
      accent: string
      published: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["memberCompany"]>
    composites: {}
  }

  type MemberCompanyGetPayload<S extends boolean | null | undefined | MemberCompanyDefaultArgs> = $Result.GetResult<Prisma.$MemberCompanyPayload, S>

  type MemberCompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemberCompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemberCompanyCountAggregateInputType | true
    }

  export interface MemberCompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemberCompany'], meta: { name: 'MemberCompany' } }
    /**
     * Find zero or one MemberCompany that matches the filter.
     * @param {MemberCompanyFindUniqueArgs} args - Arguments to find a MemberCompany
     * @example
     * // Get one MemberCompany
     * const memberCompany = await prisma.memberCompany.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberCompanyFindUniqueArgs>(args: SelectSubset<T, MemberCompanyFindUniqueArgs<ExtArgs>>): Prisma__MemberCompanyClient<$Result.GetResult<Prisma.$MemberCompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MemberCompany that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemberCompanyFindUniqueOrThrowArgs} args - Arguments to find a MemberCompany
     * @example
     * // Get one MemberCompany
     * const memberCompany = await prisma.memberCompany.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberCompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberCompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberCompanyClient<$Result.GetResult<Prisma.$MemberCompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemberCompany that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCompanyFindFirstArgs} args - Arguments to find a MemberCompany
     * @example
     * // Get one MemberCompany
     * const memberCompany = await prisma.memberCompany.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberCompanyFindFirstArgs>(args?: SelectSubset<T, MemberCompanyFindFirstArgs<ExtArgs>>): Prisma__MemberCompanyClient<$Result.GetResult<Prisma.$MemberCompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemberCompany that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCompanyFindFirstOrThrowArgs} args - Arguments to find a MemberCompany
     * @example
     * // Get one MemberCompany
     * const memberCompany = await prisma.memberCompany.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberCompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberCompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberCompanyClient<$Result.GetResult<Prisma.$MemberCompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MemberCompanies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemberCompanies
     * const memberCompanies = await prisma.memberCompany.findMany()
     * 
     * // Get first 10 MemberCompanies
     * const memberCompanies = await prisma.memberCompany.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberCompanyWithIdOnly = await prisma.memberCompany.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberCompanyFindManyArgs>(args?: SelectSubset<T, MemberCompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberCompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MemberCompany.
     * @param {MemberCompanyCreateArgs} args - Arguments to create a MemberCompany.
     * @example
     * // Create one MemberCompany
     * const MemberCompany = await prisma.memberCompany.create({
     *   data: {
     *     // ... data to create a MemberCompany
     *   }
     * })
     * 
     */
    create<T extends MemberCompanyCreateArgs>(args: SelectSubset<T, MemberCompanyCreateArgs<ExtArgs>>): Prisma__MemberCompanyClient<$Result.GetResult<Prisma.$MemberCompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MemberCompanies.
     * @param {MemberCompanyCreateManyArgs} args - Arguments to create many MemberCompanies.
     * @example
     * // Create many MemberCompanies
     * const memberCompany = await prisma.memberCompany.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberCompanyCreateManyArgs>(args?: SelectSubset<T, MemberCompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemberCompanies and returns the data saved in the database.
     * @param {MemberCompanyCreateManyAndReturnArgs} args - Arguments to create many MemberCompanies.
     * @example
     * // Create many MemberCompanies
     * const memberCompany = await prisma.memberCompany.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemberCompanies and only return the `id`
     * const memberCompanyWithIdOnly = await prisma.memberCompany.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberCompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberCompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberCompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MemberCompany.
     * @param {MemberCompanyDeleteArgs} args - Arguments to delete one MemberCompany.
     * @example
     * // Delete one MemberCompany
     * const MemberCompany = await prisma.memberCompany.delete({
     *   where: {
     *     // ... filter to delete one MemberCompany
     *   }
     * })
     * 
     */
    delete<T extends MemberCompanyDeleteArgs>(args: SelectSubset<T, MemberCompanyDeleteArgs<ExtArgs>>): Prisma__MemberCompanyClient<$Result.GetResult<Prisma.$MemberCompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MemberCompany.
     * @param {MemberCompanyUpdateArgs} args - Arguments to update one MemberCompany.
     * @example
     * // Update one MemberCompany
     * const memberCompany = await prisma.memberCompany.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberCompanyUpdateArgs>(args: SelectSubset<T, MemberCompanyUpdateArgs<ExtArgs>>): Prisma__MemberCompanyClient<$Result.GetResult<Prisma.$MemberCompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MemberCompanies.
     * @param {MemberCompanyDeleteManyArgs} args - Arguments to filter MemberCompanies to delete.
     * @example
     * // Delete a few MemberCompanies
     * const { count } = await prisma.memberCompany.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberCompanyDeleteManyArgs>(args?: SelectSubset<T, MemberCompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberCompanies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemberCompanies
     * const memberCompany = await prisma.memberCompany.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberCompanyUpdateManyArgs>(args: SelectSubset<T, MemberCompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberCompanies and returns the data updated in the database.
     * @param {MemberCompanyUpdateManyAndReturnArgs} args - Arguments to update many MemberCompanies.
     * @example
     * // Update many MemberCompanies
     * const memberCompany = await prisma.memberCompany.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MemberCompanies and only return the `id`
     * const memberCompanyWithIdOnly = await prisma.memberCompany.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemberCompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, MemberCompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberCompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MemberCompany.
     * @param {MemberCompanyUpsertArgs} args - Arguments to update or create a MemberCompany.
     * @example
     * // Update or create a MemberCompany
     * const memberCompany = await prisma.memberCompany.upsert({
     *   create: {
     *     // ... data to create a MemberCompany
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemberCompany we want to update
     *   }
     * })
     */
    upsert<T extends MemberCompanyUpsertArgs>(args: SelectSubset<T, MemberCompanyUpsertArgs<ExtArgs>>): Prisma__MemberCompanyClient<$Result.GetResult<Prisma.$MemberCompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MemberCompanies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCompanyCountArgs} args - Arguments to filter MemberCompanies to count.
     * @example
     * // Count the number of MemberCompanies
     * const count = await prisma.memberCompany.count({
     *   where: {
     *     // ... the filter for the MemberCompanies we want to count
     *   }
     * })
    **/
    count<T extends MemberCompanyCountArgs>(
      args?: Subset<T, MemberCompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberCompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemberCompany.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberCompanyAggregateArgs>(args: Subset<T, MemberCompanyAggregateArgs>): Prisma.PrismaPromise<GetMemberCompanyAggregateType<T>>

    /**
     * Group by MemberCompany.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberCompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberCompanyGroupByArgs['orderBy'] }
        : { orderBy?: MemberCompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberCompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemberCompany model
   */
  readonly fields: MemberCompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemberCompany.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberCompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MemberCompany model
   */
  interface MemberCompanyFieldRefs {
    readonly id: FieldRef<"MemberCompany", 'String'>
    readonly order: FieldRef<"MemberCompany", 'Int'>
    readonly abbr: FieldRef<"MemberCompany", 'String'>
    readonly name: FieldRef<"MemberCompany", 'String'>
    readonly tagline: FieldRef<"MemberCompany", 'String'>
    readonly descVi: FieldRef<"MemberCompany", 'String'>
    readonly descEn: FieldRef<"MemberCompany", 'String'>
    readonly accent: FieldRef<"MemberCompany", 'String'>
    readonly published: FieldRef<"MemberCompany", 'Boolean'>
    readonly createdAt: FieldRef<"MemberCompany", 'DateTime'>
    readonly updatedAt: FieldRef<"MemberCompany", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MemberCompany findUnique
   */
  export type MemberCompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCompany
     */
    select?: MemberCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberCompany
     */
    omit?: MemberCompanyOmit<ExtArgs> | null
    /**
     * Filter, which MemberCompany to fetch.
     */
    where: MemberCompanyWhereUniqueInput
  }

  /**
   * MemberCompany findUniqueOrThrow
   */
  export type MemberCompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCompany
     */
    select?: MemberCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberCompany
     */
    omit?: MemberCompanyOmit<ExtArgs> | null
    /**
     * Filter, which MemberCompany to fetch.
     */
    where: MemberCompanyWhereUniqueInput
  }

  /**
   * MemberCompany findFirst
   */
  export type MemberCompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCompany
     */
    select?: MemberCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberCompany
     */
    omit?: MemberCompanyOmit<ExtArgs> | null
    /**
     * Filter, which MemberCompany to fetch.
     */
    where?: MemberCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberCompanies to fetch.
     */
    orderBy?: MemberCompanyOrderByWithRelationInput | MemberCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberCompanies.
     */
    cursor?: MemberCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberCompanies.
     */
    distinct?: MemberCompanyScalarFieldEnum | MemberCompanyScalarFieldEnum[]
  }

  /**
   * MemberCompany findFirstOrThrow
   */
  export type MemberCompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCompany
     */
    select?: MemberCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberCompany
     */
    omit?: MemberCompanyOmit<ExtArgs> | null
    /**
     * Filter, which MemberCompany to fetch.
     */
    where?: MemberCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberCompanies to fetch.
     */
    orderBy?: MemberCompanyOrderByWithRelationInput | MemberCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberCompanies.
     */
    cursor?: MemberCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberCompanies.
     */
    distinct?: MemberCompanyScalarFieldEnum | MemberCompanyScalarFieldEnum[]
  }

  /**
   * MemberCompany findMany
   */
  export type MemberCompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCompany
     */
    select?: MemberCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberCompany
     */
    omit?: MemberCompanyOmit<ExtArgs> | null
    /**
     * Filter, which MemberCompanies to fetch.
     */
    where?: MemberCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberCompanies to fetch.
     */
    orderBy?: MemberCompanyOrderByWithRelationInput | MemberCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemberCompanies.
     */
    cursor?: MemberCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberCompanies.
     */
    distinct?: MemberCompanyScalarFieldEnum | MemberCompanyScalarFieldEnum[]
  }

  /**
   * MemberCompany create
   */
  export type MemberCompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCompany
     */
    select?: MemberCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberCompany
     */
    omit?: MemberCompanyOmit<ExtArgs> | null
    /**
     * The data needed to create a MemberCompany.
     */
    data: XOR<MemberCompanyCreateInput, MemberCompanyUncheckedCreateInput>
  }

  /**
   * MemberCompany createMany
   */
  export type MemberCompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemberCompanies.
     */
    data: MemberCompanyCreateManyInput | MemberCompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemberCompany createManyAndReturn
   */
  export type MemberCompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCompany
     */
    select?: MemberCompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemberCompany
     */
    omit?: MemberCompanyOmit<ExtArgs> | null
    /**
     * The data used to create many MemberCompanies.
     */
    data: MemberCompanyCreateManyInput | MemberCompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemberCompany update
   */
  export type MemberCompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCompany
     */
    select?: MemberCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberCompany
     */
    omit?: MemberCompanyOmit<ExtArgs> | null
    /**
     * The data needed to update a MemberCompany.
     */
    data: XOR<MemberCompanyUpdateInput, MemberCompanyUncheckedUpdateInput>
    /**
     * Choose, which MemberCompany to update.
     */
    where: MemberCompanyWhereUniqueInput
  }

  /**
   * MemberCompany updateMany
   */
  export type MemberCompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemberCompanies.
     */
    data: XOR<MemberCompanyUpdateManyMutationInput, MemberCompanyUncheckedUpdateManyInput>
    /**
     * Filter which MemberCompanies to update
     */
    where?: MemberCompanyWhereInput
    /**
     * Limit how many MemberCompanies to update.
     */
    limit?: number
  }

  /**
   * MemberCompany updateManyAndReturn
   */
  export type MemberCompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCompany
     */
    select?: MemberCompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemberCompany
     */
    omit?: MemberCompanyOmit<ExtArgs> | null
    /**
     * The data used to update MemberCompanies.
     */
    data: XOR<MemberCompanyUpdateManyMutationInput, MemberCompanyUncheckedUpdateManyInput>
    /**
     * Filter which MemberCompanies to update
     */
    where?: MemberCompanyWhereInput
    /**
     * Limit how many MemberCompanies to update.
     */
    limit?: number
  }

  /**
   * MemberCompany upsert
   */
  export type MemberCompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCompany
     */
    select?: MemberCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberCompany
     */
    omit?: MemberCompanyOmit<ExtArgs> | null
    /**
     * The filter to search for the MemberCompany to update in case it exists.
     */
    where: MemberCompanyWhereUniqueInput
    /**
     * In case the MemberCompany found by the `where` argument doesn't exist, create a new MemberCompany with this data.
     */
    create: XOR<MemberCompanyCreateInput, MemberCompanyUncheckedCreateInput>
    /**
     * In case the MemberCompany was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberCompanyUpdateInput, MemberCompanyUncheckedUpdateInput>
  }

  /**
   * MemberCompany delete
   */
  export type MemberCompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCompany
     */
    select?: MemberCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberCompany
     */
    omit?: MemberCompanyOmit<ExtArgs> | null
    /**
     * Filter which MemberCompany to delete.
     */
    where: MemberCompanyWhereUniqueInput
  }

  /**
   * MemberCompany deleteMany
   */
  export type MemberCompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberCompanies to delete
     */
    where?: MemberCompanyWhereInput
    /**
     * Limit how many MemberCompanies to delete.
     */
    limit?: number
  }

  /**
   * MemberCompany without action
   */
  export type MemberCompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCompany
     */
    select?: MemberCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberCompany
     */
    omit?: MemberCompanyOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    title: 'title',
    titleEn: 'titleEn',
    category: 'category',
    location: 'location',
    area: 'area',
    duration: 'duration',
    client: 'client',
    year: 'year',
    image: 'image',
    images: 'images',
    description: 'description',
    descriptionEn: 'descriptionEn',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    order: 'order',
    icon: 'icon',
    titleVi: 'titleVi',
    titleEn: 'titleEn',
    subtitleVi: 'subtitleVi',
    subtitleEn: 'subtitleEn',
    descVi: 'descVi',
    descEn: 'descEn',
    tag: 'tag',
    bulletsVi: 'bulletsVi',
    bulletsEn: 'bulletsEn',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const NewsArticleScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    titleVi: 'titleVi',
    titleEn: 'titleEn',
    summaryVi: 'summaryVi',
    summaryEn: 'summaryEn',
    contentVi: 'contentVi',
    contentEn: 'contentEn',
    image: 'image',
    categoryVi: 'categoryVi',
    categoryEn: 'categoryEn',
    date: 'date',
    readTime: 'readTime',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NewsArticleScalarFieldEnum = (typeof NewsArticleScalarFieldEnum)[keyof typeof NewsArticleScalarFieldEnum]


  export const PartnerScalarFieldEnum: {
    id: 'id',
    order: 'order',
    name: 'name',
    sectorVi: 'sectorVi',
    sectorEn: 'sectorEn',
    descVi: 'descVi',
    descEn: 'descEn',
    founded: 'founded',
    hq: 'hq',
    statLabelVi: 'statLabelVi',
    statLabelEn: 'statLabelEn',
    statValue: 'statValue',
    projectsVi: 'projectsVi',
    projectsEn: 'projectsEn',
    highlightVi: 'highlightVi',
    highlightEn: 'highlightEn',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartnerScalarFieldEnum = (typeof PartnerScalarFieldEnum)[keyof typeof PartnerScalarFieldEnum]


  export const TimelineItemScalarFieldEnum: {
    id: 'id',
    order: 'order',
    year: 'year',
    titleVi: 'titleVi',
    titleEn: 'titleEn',
    descVi: 'descVi',
    descEn: 'descEn',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TimelineItemScalarFieldEnum = (typeof TimelineItemScalarFieldEnum)[keyof typeof TimelineItemScalarFieldEnum]


  export const MemberCompanyScalarFieldEnum: {
    id: 'id',
    order: 'order',
    abbr: 'abbr',
    name: 'name',
    tagline: 'tagline',
    descVi: 'descVi',
    descEn: 'descEn',
    accent: 'accent',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberCompanyScalarFieldEnum = (typeof MemberCompanyScalarFieldEnum)[keyof typeof MemberCompanyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    slug?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    titleEn?: StringFilter<"Project"> | string
    category?: StringFilter<"Project"> | string
    location?: StringFilter<"Project"> | string
    area?: StringFilter<"Project"> | string
    duration?: StringFilter<"Project"> | string
    client?: StringFilter<"Project"> | string
    year?: StringFilter<"Project"> | string
    image?: StringFilter<"Project"> | string
    images?: StringNullableListFilter<"Project">
    description?: StringFilter<"Project"> | string
    descriptionEn?: StringFilter<"Project"> | string
    published?: BoolFilter<"Project"> | boolean
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    titleEn?: SortOrder
    category?: SortOrder
    location?: SortOrder
    area?: SortOrder
    duration?: SortOrder
    client?: SortOrder
    year?: SortOrder
    image?: SortOrder
    images?: SortOrder
    description?: SortOrder
    descriptionEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    title?: StringFilter<"Project"> | string
    titleEn?: StringFilter<"Project"> | string
    category?: StringFilter<"Project"> | string
    location?: StringFilter<"Project"> | string
    area?: StringFilter<"Project"> | string
    duration?: StringFilter<"Project"> | string
    client?: StringFilter<"Project"> | string
    year?: StringFilter<"Project"> | string
    image?: StringFilter<"Project"> | string
    images?: StringNullableListFilter<"Project">
    description?: StringFilter<"Project"> | string
    descriptionEn?: StringFilter<"Project"> | string
    published?: BoolFilter<"Project"> | boolean
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }, "id" | "slug">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    titleEn?: SortOrder
    category?: SortOrder
    location?: SortOrder
    area?: SortOrder
    duration?: SortOrder
    client?: SortOrder
    year?: SortOrder
    image?: SortOrder
    images?: SortOrder
    description?: SortOrder
    descriptionEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    slug?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    titleEn?: StringWithAggregatesFilter<"Project"> | string
    category?: StringWithAggregatesFilter<"Project"> | string
    location?: StringWithAggregatesFilter<"Project"> | string
    area?: StringWithAggregatesFilter<"Project"> | string
    duration?: StringWithAggregatesFilter<"Project"> | string
    client?: StringWithAggregatesFilter<"Project"> | string
    year?: StringWithAggregatesFilter<"Project"> | string
    image?: StringWithAggregatesFilter<"Project"> | string
    images?: StringNullableListFilter<"Project">
    description?: StringWithAggregatesFilter<"Project"> | string
    descriptionEn?: StringWithAggregatesFilter<"Project"> | string
    published?: BoolWithAggregatesFilter<"Project"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    slug?: StringFilter<"Service"> | string
    order?: IntFilter<"Service"> | number
    icon?: StringFilter<"Service"> | string
    titleVi?: StringFilter<"Service"> | string
    titleEn?: StringFilter<"Service"> | string
    subtitleVi?: StringFilter<"Service"> | string
    subtitleEn?: StringFilter<"Service"> | string
    descVi?: StringFilter<"Service"> | string
    descEn?: StringFilter<"Service"> | string
    tag?: StringFilter<"Service"> | string
    bulletsVi?: StringNullableListFilter<"Service">
    bulletsEn?: StringNullableListFilter<"Service">
    published?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    icon?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    subtitleVi?: SortOrder
    subtitleEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    tag?: SortOrder
    bulletsVi?: SortOrder
    bulletsEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    order?: IntFilter<"Service"> | number
    icon?: StringFilter<"Service"> | string
    titleVi?: StringFilter<"Service"> | string
    titleEn?: StringFilter<"Service"> | string
    subtitleVi?: StringFilter<"Service"> | string
    subtitleEn?: StringFilter<"Service"> | string
    descVi?: StringFilter<"Service"> | string
    descEn?: StringFilter<"Service"> | string
    tag?: StringFilter<"Service"> | string
    bulletsVi?: StringNullableListFilter<"Service">
    bulletsEn?: StringNullableListFilter<"Service">
    published?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
  }, "id" | "slug">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    icon?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    subtitleVi?: SortOrder
    subtitleEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    tag?: SortOrder
    bulletsVi?: SortOrder
    bulletsEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    slug?: StringWithAggregatesFilter<"Service"> | string
    order?: IntWithAggregatesFilter<"Service"> | number
    icon?: StringWithAggregatesFilter<"Service"> | string
    titleVi?: StringWithAggregatesFilter<"Service"> | string
    titleEn?: StringWithAggregatesFilter<"Service"> | string
    subtitleVi?: StringWithAggregatesFilter<"Service"> | string
    subtitleEn?: StringWithAggregatesFilter<"Service"> | string
    descVi?: StringWithAggregatesFilter<"Service"> | string
    descEn?: StringWithAggregatesFilter<"Service"> | string
    tag?: StringWithAggregatesFilter<"Service"> | string
    bulletsVi?: StringNullableListFilter<"Service">
    bulletsEn?: StringNullableListFilter<"Service">
    published?: BoolWithAggregatesFilter<"Service"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type NewsArticleWhereInput = {
    AND?: NewsArticleWhereInput | NewsArticleWhereInput[]
    OR?: NewsArticleWhereInput[]
    NOT?: NewsArticleWhereInput | NewsArticleWhereInput[]
    id?: StringFilter<"NewsArticle"> | string
    slug?: StringFilter<"NewsArticle"> | string
    titleVi?: StringFilter<"NewsArticle"> | string
    titleEn?: StringFilter<"NewsArticle"> | string
    summaryVi?: StringFilter<"NewsArticle"> | string
    summaryEn?: StringFilter<"NewsArticle"> | string
    contentVi?: StringNullableListFilter<"NewsArticle">
    contentEn?: StringNullableListFilter<"NewsArticle">
    image?: StringFilter<"NewsArticle"> | string
    categoryVi?: StringFilter<"NewsArticle"> | string
    categoryEn?: StringFilter<"NewsArticle"> | string
    date?: StringFilter<"NewsArticle"> | string
    readTime?: IntFilter<"NewsArticle"> | number
    published?: BoolFilter<"NewsArticle"> | boolean
    createdAt?: DateTimeFilter<"NewsArticle"> | Date | string
    updatedAt?: DateTimeFilter<"NewsArticle"> | Date | string
  }

  export type NewsArticleOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    summaryVi?: SortOrder
    summaryEn?: SortOrder
    contentVi?: SortOrder
    contentEn?: SortOrder
    image?: SortOrder
    categoryVi?: SortOrder
    categoryEn?: SortOrder
    date?: SortOrder
    readTime?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: NewsArticleWhereInput | NewsArticleWhereInput[]
    OR?: NewsArticleWhereInput[]
    NOT?: NewsArticleWhereInput | NewsArticleWhereInput[]
    titleVi?: StringFilter<"NewsArticle"> | string
    titleEn?: StringFilter<"NewsArticle"> | string
    summaryVi?: StringFilter<"NewsArticle"> | string
    summaryEn?: StringFilter<"NewsArticle"> | string
    contentVi?: StringNullableListFilter<"NewsArticle">
    contentEn?: StringNullableListFilter<"NewsArticle">
    image?: StringFilter<"NewsArticle"> | string
    categoryVi?: StringFilter<"NewsArticle"> | string
    categoryEn?: StringFilter<"NewsArticle"> | string
    date?: StringFilter<"NewsArticle"> | string
    readTime?: IntFilter<"NewsArticle"> | number
    published?: BoolFilter<"NewsArticle"> | boolean
    createdAt?: DateTimeFilter<"NewsArticle"> | Date | string
    updatedAt?: DateTimeFilter<"NewsArticle"> | Date | string
  }, "id" | "slug">

  export type NewsArticleOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    summaryVi?: SortOrder
    summaryEn?: SortOrder
    contentVi?: SortOrder
    contentEn?: SortOrder
    image?: SortOrder
    categoryVi?: SortOrder
    categoryEn?: SortOrder
    date?: SortOrder
    readTime?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NewsArticleCountOrderByAggregateInput
    _avg?: NewsArticleAvgOrderByAggregateInput
    _max?: NewsArticleMaxOrderByAggregateInput
    _min?: NewsArticleMinOrderByAggregateInput
    _sum?: NewsArticleSumOrderByAggregateInput
  }

  export type NewsArticleScalarWhereWithAggregatesInput = {
    AND?: NewsArticleScalarWhereWithAggregatesInput | NewsArticleScalarWhereWithAggregatesInput[]
    OR?: NewsArticleScalarWhereWithAggregatesInput[]
    NOT?: NewsArticleScalarWhereWithAggregatesInput | NewsArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsArticle"> | string
    slug?: StringWithAggregatesFilter<"NewsArticle"> | string
    titleVi?: StringWithAggregatesFilter<"NewsArticle"> | string
    titleEn?: StringWithAggregatesFilter<"NewsArticle"> | string
    summaryVi?: StringWithAggregatesFilter<"NewsArticle"> | string
    summaryEn?: StringWithAggregatesFilter<"NewsArticle"> | string
    contentVi?: StringNullableListFilter<"NewsArticle">
    contentEn?: StringNullableListFilter<"NewsArticle">
    image?: StringWithAggregatesFilter<"NewsArticle"> | string
    categoryVi?: StringWithAggregatesFilter<"NewsArticle"> | string
    categoryEn?: StringWithAggregatesFilter<"NewsArticle"> | string
    date?: StringWithAggregatesFilter<"NewsArticle"> | string
    readTime?: IntWithAggregatesFilter<"NewsArticle"> | number
    published?: BoolWithAggregatesFilter<"NewsArticle"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"NewsArticle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NewsArticle"> | Date | string
  }

  export type PartnerWhereInput = {
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    id?: StringFilter<"Partner"> | string
    order?: IntFilter<"Partner"> | number
    name?: StringFilter<"Partner"> | string
    sectorVi?: StringFilter<"Partner"> | string
    sectorEn?: StringFilter<"Partner"> | string
    descVi?: StringFilter<"Partner"> | string
    descEn?: StringFilter<"Partner"> | string
    founded?: IntFilter<"Partner"> | number
    hq?: StringFilter<"Partner"> | string
    statLabelVi?: StringFilter<"Partner"> | string
    statLabelEn?: StringFilter<"Partner"> | string
    statValue?: StringFilter<"Partner"> | string
    projectsVi?: StringNullableListFilter<"Partner">
    projectsEn?: StringNullableListFilter<"Partner">
    highlightVi?: StringFilter<"Partner"> | string
    highlightEn?: StringFilter<"Partner"> | string
    published?: BoolFilter<"Partner"> | boolean
    createdAt?: DateTimeFilter<"Partner"> | Date | string
    updatedAt?: DateTimeFilter<"Partner"> | Date | string
  }

  export type PartnerOrderByWithRelationInput = {
    id?: SortOrder
    order?: SortOrder
    name?: SortOrder
    sectorVi?: SortOrder
    sectorEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    founded?: SortOrder
    hq?: SortOrder
    statLabelVi?: SortOrder
    statLabelEn?: SortOrder
    statValue?: SortOrder
    projectsVi?: SortOrder
    projectsEn?: SortOrder
    highlightVi?: SortOrder
    highlightEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    order?: IntFilter<"Partner"> | number
    name?: StringFilter<"Partner"> | string
    sectorVi?: StringFilter<"Partner"> | string
    sectorEn?: StringFilter<"Partner"> | string
    descVi?: StringFilter<"Partner"> | string
    descEn?: StringFilter<"Partner"> | string
    founded?: IntFilter<"Partner"> | number
    hq?: StringFilter<"Partner"> | string
    statLabelVi?: StringFilter<"Partner"> | string
    statLabelEn?: StringFilter<"Partner"> | string
    statValue?: StringFilter<"Partner"> | string
    projectsVi?: StringNullableListFilter<"Partner">
    projectsEn?: StringNullableListFilter<"Partner">
    highlightVi?: StringFilter<"Partner"> | string
    highlightEn?: StringFilter<"Partner"> | string
    published?: BoolFilter<"Partner"> | boolean
    createdAt?: DateTimeFilter<"Partner"> | Date | string
    updatedAt?: DateTimeFilter<"Partner"> | Date | string
  }, "id">

  export type PartnerOrderByWithAggregationInput = {
    id?: SortOrder
    order?: SortOrder
    name?: SortOrder
    sectorVi?: SortOrder
    sectorEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    founded?: SortOrder
    hq?: SortOrder
    statLabelVi?: SortOrder
    statLabelEn?: SortOrder
    statValue?: SortOrder
    projectsVi?: SortOrder
    projectsEn?: SortOrder
    highlightVi?: SortOrder
    highlightEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartnerCountOrderByAggregateInput
    _avg?: PartnerAvgOrderByAggregateInput
    _max?: PartnerMaxOrderByAggregateInput
    _min?: PartnerMinOrderByAggregateInput
    _sum?: PartnerSumOrderByAggregateInput
  }

  export type PartnerScalarWhereWithAggregatesInput = {
    AND?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    OR?: PartnerScalarWhereWithAggregatesInput[]
    NOT?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Partner"> | string
    order?: IntWithAggregatesFilter<"Partner"> | number
    name?: StringWithAggregatesFilter<"Partner"> | string
    sectorVi?: StringWithAggregatesFilter<"Partner"> | string
    sectorEn?: StringWithAggregatesFilter<"Partner"> | string
    descVi?: StringWithAggregatesFilter<"Partner"> | string
    descEn?: StringWithAggregatesFilter<"Partner"> | string
    founded?: IntWithAggregatesFilter<"Partner"> | number
    hq?: StringWithAggregatesFilter<"Partner"> | string
    statLabelVi?: StringWithAggregatesFilter<"Partner"> | string
    statLabelEn?: StringWithAggregatesFilter<"Partner"> | string
    statValue?: StringWithAggregatesFilter<"Partner"> | string
    projectsVi?: StringNullableListFilter<"Partner">
    projectsEn?: StringNullableListFilter<"Partner">
    highlightVi?: StringWithAggregatesFilter<"Partner"> | string
    highlightEn?: StringWithAggregatesFilter<"Partner"> | string
    published?: BoolWithAggregatesFilter<"Partner"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Partner"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Partner"> | Date | string
  }

  export type TimelineItemWhereInput = {
    AND?: TimelineItemWhereInput | TimelineItemWhereInput[]
    OR?: TimelineItemWhereInput[]
    NOT?: TimelineItemWhereInput | TimelineItemWhereInput[]
    id?: StringFilter<"TimelineItem"> | string
    order?: IntFilter<"TimelineItem"> | number
    year?: StringFilter<"TimelineItem"> | string
    titleVi?: StringFilter<"TimelineItem"> | string
    titleEn?: StringFilter<"TimelineItem"> | string
    descVi?: StringFilter<"TimelineItem"> | string
    descEn?: StringFilter<"TimelineItem"> | string
    createdAt?: DateTimeFilter<"TimelineItem"> | Date | string
    updatedAt?: DateTimeFilter<"TimelineItem"> | Date | string
  }

  export type TimelineItemOrderByWithRelationInput = {
    id?: SortOrder
    order?: SortOrder
    year?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimelineItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimelineItemWhereInput | TimelineItemWhereInput[]
    OR?: TimelineItemWhereInput[]
    NOT?: TimelineItemWhereInput | TimelineItemWhereInput[]
    order?: IntFilter<"TimelineItem"> | number
    year?: StringFilter<"TimelineItem"> | string
    titleVi?: StringFilter<"TimelineItem"> | string
    titleEn?: StringFilter<"TimelineItem"> | string
    descVi?: StringFilter<"TimelineItem"> | string
    descEn?: StringFilter<"TimelineItem"> | string
    createdAt?: DateTimeFilter<"TimelineItem"> | Date | string
    updatedAt?: DateTimeFilter<"TimelineItem"> | Date | string
  }, "id">

  export type TimelineItemOrderByWithAggregationInput = {
    id?: SortOrder
    order?: SortOrder
    year?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TimelineItemCountOrderByAggregateInput
    _avg?: TimelineItemAvgOrderByAggregateInput
    _max?: TimelineItemMaxOrderByAggregateInput
    _min?: TimelineItemMinOrderByAggregateInput
    _sum?: TimelineItemSumOrderByAggregateInput
  }

  export type TimelineItemScalarWhereWithAggregatesInput = {
    AND?: TimelineItemScalarWhereWithAggregatesInput | TimelineItemScalarWhereWithAggregatesInput[]
    OR?: TimelineItemScalarWhereWithAggregatesInput[]
    NOT?: TimelineItemScalarWhereWithAggregatesInput | TimelineItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimelineItem"> | string
    order?: IntWithAggregatesFilter<"TimelineItem"> | number
    year?: StringWithAggregatesFilter<"TimelineItem"> | string
    titleVi?: StringWithAggregatesFilter<"TimelineItem"> | string
    titleEn?: StringWithAggregatesFilter<"TimelineItem"> | string
    descVi?: StringWithAggregatesFilter<"TimelineItem"> | string
    descEn?: StringWithAggregatesFilter<"TimelineItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TimelineItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TimelineItem"> | Date | string
  }

  export type MemberCompanyWhereInput = {
    AND?: MemberCompanyWhereInput | MemberCompanyWhereInput[]
    OR?: MemberCompanyWhereInput[]
    NOT?: MemberCompanyWhereInput | MemberCompanyWhereInput[]
    id?: StringFilter<"MemberCompany"> | string
    order?: IntFilter<"MemberCompany"> | number
    abbr?: StringFilter<"MemberCompany"> | string
    name?: StringFilter<"MemberCompany"> | string
    tagline?: StringFilter<"MemberCompany"> | string
    descVi?: StringFilter<"MemberCompany"> | string
    descEn?: StringFilter<"MemberCompany"> | string
    accent?: StringFilter<"MemberCompany"> | string
    published?: BoolFilter<"MemberCompany"> | boolean
    createdAt?: DateTimeFilter<"MemberCompany"> | Date | string
    updatedAt?: DateTimeFilter<"MemberCompany"> | Date | string
  }

  export type MemberCompanyOrderByWithRelationInput = {
    id?: SortOrder
    order?: SortOrder
    abbr?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    accent?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberCompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MemberCompanyWhereInput | MemberCompanyWhereInput[]
    OR?: MemberCompanyWhereInput[]
    NOT?: MemberCompanyWhereInput | MemberCompanyWhereInput[]
    order?: IntFilter<"MemberCompany"> | number
    abbr?: StringFilter<"MemberCompany"> | string
    name?: StringFilter<"MemberCompany"> | string
    tagline?: StringFilter<"MemberCompany"> | string
    descVi?: StringFilter<"MemberCompany"> | string
    descEn?: StringFilter<"MemberCompany"> | string
    accent?: StringFilter<"MemberCompany"> | string
    published?: BoolFilter<"MemberCompany"> | boolean
    createdAt?: DateTimeFilter<"MemberCompany"> | Date | string
    updatedAt?: DateTimeFilter<"MemberCompany"> | Date | string
  }, "id">

  export type MemberCompanyOrderByWithAggregationInput = {
    id?: SortOrder
    order?: SortOrder
    abbr?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    accent?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberCompanyCountOrderByAggregateInput
    _avg?: MemberCompanyAvgOrderByAggregateInput
    _max?: MemberCompanyMaxOrderByAggregateInput
    _min?: MemberCompanyMinOrderByAggregateInput
    _sum?: MemberCompanySumOrderByAggregateInput
  }

  export type MemberCompanyScalarWhereWithAggregatesInput = {
    AND?: MemberCompanyScalarWhereWithAggregatesInput | MemberCompanyScalarWhereWithAggregatesInput[]
    OR?: MemberCompanyScalarWhereWithAggregatesInput[]
    NOT?: MemberCompanyScalarWhereWithAggregatesInput | MemberCompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MemberCompany"> | string
    order?: IntWithAggregatesFilter<"MemberCompany"> | number
    abbr?: StringWithAggregatesFilter<"MemberCompany"> | string
    name?: StringWithAggregatesFilter<"MemberCompany"> | string
    tagline?: StringWithAggregatesFilter<"MemberCompany"> | string
    descVi?: StringWithAggregatesFilter<"MemberCompany"> | string
    descEn?: StringWithAggregatesFilter<"MemberCompany"> | string
    accent?: StringWithAggregatesFilter<"MemberCompany"> | string
    published?: BoolWithAggregatesFilter<"MemberCompany"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MemberCompany"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MemberCompany"> | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    slug: string
    title: string
    titleEn: string
    category: string
    location: string
    area?: string
    duration?: string
    client: string
    year: string
    image: string
    images?: ProjectCreateimagesInput | string[]
    description: string
    descriptionEn: string
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    slug: string
    title: string
    titleEn: string
    category: string
    location: string
    area?: string
    duration?: string
    client: string
    year: string
    image: string
    images?: ProjectCreateimagesInput | string[]
    description: string
    descriptionEn: string
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    client?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    images?: ProjectUpdateimagesInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    descriptionEn?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    client?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    images?: ProjectUpdateimagesInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    descriptionEn?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateManyInput = {
    id?: string
    slug: string
    title: string
    titleEn: string
    category: string
    location: string
    area?: string
    duration?: string
    client: string
    year: string
    image: string
    images?: ProjectCreateimagesInput | string[]
    description: string
    descriptionEn: string
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    client?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    images?: ProjectUpdateimagesInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    descriptionEn?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    client?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    images?: ProjectUpdateimagesInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    descriptionEn?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    id?: string
    slug: string
    order?: number
    icon: string
    titleVi: string
    titleEn: string
    subtitleVi: string
    subtitleEn: string
    descVi: string
    descEn: string
    tag: string
    bulletsVi?: ServiceCreatebulletsViInput | string[]
    bulletsEn?: ServiceCreatebulletsEnInput | string[]
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    slug: string
    order?: number
    icon: string
    titleVi: string
    titleEn: string
    subtitleVi: string
    subtitleEn: string
    descVi: string
    descEn: string
    tag: string
    bulletsVi?: ServiceCreatebulletsViInput | string[]
    bulletsEn?: ServiceCreatebulletsEnInput | string[]
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    icon?: StringFieldUpdateOperationsInput | string
    titleVi?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    subtitleVi?: StringFieldUpdateOperationsInput | string
    subtitleEn?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    bulletsVi?: ServiceUpdatebulletsViInput | string[]
    bulletsEn?: ServiceUpdatebulletsEnInput | string[]
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    icon?: StringFieldUpdateOperationsInput | string
    titleVi?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    subtitleVi?: StringFieldUpdateOperationsInput | string
    subtitleEn?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    bulletsVi?: ServiceUpdatebulletsViInput | string[]
    bulletsEn?: ServiceUpdatebulletsEnInput | string[]
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateManyInput = {
    id?: string
    slug: string
    order?: number
    icon: string
    titleVi: string
    titleEn: string
    subtitleVi: string
    subtitleEn: string
    descVi: string
    descEn: string
    tag: string
    bulletsVi?: ServiceCreatebulletsViInput | string[]
    bulletsEn?: ServiceCreatebulletsEnInput | string[]
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    icon?: StringFieldUpdateOperationsInput | string
    titleVi?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    subtitleVi?: StringFieldUpdateOperationsInput | string
    subtitleEn?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    bulletsVi?: ServiceUpdatebulletsViInput | string[]
    bulletsEn?: ServiceUpdatebulletsEnInput | string[]
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    icon?: StringFieldUpdateOperationsInput | string
    titleVi?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    subtitleVi?: StringFieldUpdateOperationsInput | string
    subtitleEn?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    bulletsVi?: ServiceUpdatebulletsViInput | string[]
    bulletsEn?: ServiceUpdatebulletsEnInput | string[]
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsArticleCreateInput = {
    id?: string
    slug: string
    titleVi: string
    titleEn: string
    summaryVi: string
    summaryEn: string
    contentVi?: NewsArticleCreatecontentViInput | string[]
    contentEn?: NewsArticleCreatecontentEnInput | string[]
    image: string
    categoryVi: string
    categoryEn: string
    date: string
    readTime?: number
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsArticleUncheckedCreateInput = {
    id?: string
    slug: string
    titleVi: string
    titleEn: string
    summaryVi: string
    summaryEn: string
    contentVi?: NewsArticleCreatecontentViInput | string[]
    contentEn?: NewsArticleCreatecontentEnInput | string[]
    image: string
    categoryVi: string
    categoryEn: string
    date: string
    readTime?: number
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    titleVi?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    summaryVi?: StringFieldUpdateOperationsInput | string
    summaryEn?: StringFieldUpdateOperationsInput | string
    contentVi?: NewsArticleUpdatecontentViInput | string[]
    contentEn?: NewsArticleUpdatecontentEnInput | string[]
    image?: StringFieldUpdateOperationsInput | string
    categoryVi?: StringFieldUpdateOperationsInput | string
    categoryEn?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    titleVi?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    summaryVi?: StringFieldUpdateOperationsInput | string
    summaryEn?: StringFieldUpdateOperationsInput | string
    contentVi?: NewsArticleUpdatecontentViInput | string[]
    contentEn?: NewsArticleUpdatecontentEnInput | string[]
    image?: StringFieldUpdateOperationsInput | string
    categoryVi?: StringFieldUpdateOperationsInput | string
    categoryEn?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsArticleCreateManyInput = {
    id?: string
    slug: string
    titleVi: string
    titleEn: string
    summaryVi: string
    summaryEn: string
    contentVi?: NewsArticleCreatecontentViInput | string[]
    contentEn?: NewsArticleCreatecontentEnInput | string[]
    image: string
    categoryVi: string
    categoryEn: string
    date: string
    readTime?: number
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    titleVi?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    summaryVi?: StringFieldUpdateOperationsInput | string
    summaryEn?: StringFieldUpdateOperationsInput | string
    contentVi?: NewsArticleUpdatecontentViInput | string[]
    contentEn?: NewsArticleUpdatecontentEnInput | string[]
    image?: StringFieldUpdateOperationsInput | string
    categoryVi?: StringFieldUpdateOperationsInput | string
    categoryEn?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    titleVi?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    summaryVi?: StringFieldUpdateOperationsInput | string
    summaryEn?: StringFieldUpdateOperationsInput | string
    contentVi?: NewsArticleUpdatecontentViInput | string[]
    contentEn?: NewsArticleUpdatecontentEnInput | string[]
    image?: StringFieldUpdateOperationsInput | string
    categoryVi?: StringFieldUpdateOperationsInput | string
    categoryEn?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerCreateInput = {
    id?: string
    order?: number
    name: string
    sectorVi: string
    sectorEn: string
    descVi: string
    descEn: string
    founded: number
    hq: string
    statLabelVi: string
    statLabelEn: string
    statValue: string
    projectsVi?: PartnerCreateprojectsViInput | string[]
    projectsEn?: PartnerCreateprojectsEnInput | string[]
    highlightVi: string
    highlightEn: string
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerUncheckedCreateInput = {
    id?: string
    order?: number
    name: string
    sectorVi: string
    sectorEn: string
    descVi: string
    descEn: string
    founded: number
    hq: string
    statLabelVi: string
    statLabelEn: string
    statValue: string
    projectsVi?: PartnerCreateprojectsViInput | string[]
    projectsEn?: PartnerCreateprojectsEnInput | string[]
    highlightVi: string
    highlightEn: string
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sectorVi?: StringFieldUpdateOperationsInput | string
    sectorEn?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    founded?: IntFieldUpdateOperationsInput | number
    hq?: StringFieldUpdateOperationsInput | string
    statLabelVi?: StringFieldUpdateOperationsInput | string
    statLabelEn?: StringFieldUpdateOperationsInput | string
    statValue?: StringFieldUpdateOperationsInput | string
    projectsVi?: PartnerUpdateprojectsViInput | string[]
    projectsEn?: PartnerUpdateprojectsEnInput | string[]
    highlightVi?: StringFieldUpdateOperationsInput | string
    highlightEn?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sectorVi?: StringFieldUpdateOperationsInput | string
    sectorEn?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    founded?: IntFieldUpdateOperationsInput | number
    hq?: StringFieldUpdateOperationsInput | string
    statLabelVi?: StringFieldUpdateOperationsInput | string
    statLabelEn?: StringFieldUpdateOperationsInput | string
    statValue?: StringFieldUpdateOperationsInput | string
    projectsVi?: PartnerUpdateprojectsViInput | string[]
    projectsEn?: PartnerUpdateprojectsEnInput | string[]
    highlightVi?: StringFieldUpdateOperationsInput | string
    highlightEn?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerCreateManyInput = {
    id?: string
    order?: number
    name: string
    sectorVi: string
    sectorEn: string
    descVi: string
    descEn: string
    founded: number
    hq: string
    statLabelVi: string
    statLabelEn: string
    statValue: string
    projectsVi?: PartnerCreateprojectsViInput | string[]
    projectsEn?: PartnerCreateprojectsEnInput | string[]
    highlightVi: string
    highlightEn: string
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sectorVi?: StringFieldUpdateOperationsInput | string
    sectorEn?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    founded?: IntFieldUpdateOperationsInput | number
    hq?: StringFieldUpdateOperationsInput | string
    statLabelVi?: StringFieldUpdateOperationsInput | string
    statLabelEn?: StringFieldUpdateOperationsInput | string
    statValue?: StringFieldUpdateOperationsInput | string
    projectsVi?: PartnerUpdateprojectsViInput | string[]
    projectsEn?: PartnerUpdateprojectsEnInput | string[]
    highlightVi?: StringFieldUpdateOperationsInput | string
    highlightEn?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sectorVi?: StringFieldUpdateOperationsInput | string
    sectorEn?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    founded?: IntFieldUpdateOperationsInput | number
    hq?: StringFieldUpdateOperationsInput | string
    statLabelVi?: StringFieldUpdateOperationsInput | string
    statLabelEn?: StringFieldUpdateOperationsInput | string
    statValue?: StringFieldUpdateOperationsInput | string
    projectsVi?: PartnerUpdateprojectsViInput | string[]
    projectsEn?: PartnerUpdateprojectsEnInput | string[]
    highlightVi?: StringFieldUpdateOperationsInput | string
    highlightEn?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimelineItemCreateInput = {
    id?: string
    order?: number
    year: string
    titleVi: string
    titleEn: string
    descVi: string
    descEn: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimelineItemUncheckedCreateInput = {
    id?: string
    order?: number
    year: string
    titleVi: string
    titleEn: string
    descVi: string
    descEn: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimelineItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    year?: StringFieldUpdateOperationsInput | string
    titleVi?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimelineItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    year?: StringFieldUpdateOperationsInput | string
    titleVi?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimelineItemCreateManyInput = {
    id?: string
    order?: number
    year: string
    titleVi: string
    titleEn: string
    descVi: string
    descEn: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimelineItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    year?: StringFieldUpdateOperationsInput | string
    titleVi?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimelineItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    year?: StringFieldUpdateOperationsInput | string
    titleVi?: StringFieldUpdateOperationsInput | string
    titleEn?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberCompanyCreateInput = {
    id?: string
    order?: number
    abbr: string
    name: string
    tagline: string
    descVi: string
    descEn: string
    accent: string
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberCompanyUncheckedCreateInput = {
    id?: string
    order?: number
    abbr: string
    name: string
    tagline: string
    descVi: string
    descEn: string
    accent: string
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberCompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    abbr?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    accent?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberCompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    abbr?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    accent?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberCompanyCreateManyInput = {
    id?: string
    order?: number
    abbr: string
    name: string
    tagline: string
    descVi: string
    descEn: string
    accent: string
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberCompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    abbr?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    accent?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberCompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    abbr?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    descVi?: StringFieldUpdateOperationsInput | string
    descEn?: StringFieldUpdateOperationsInput | string
    accent?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    titleEn?: SortOrder
    category?: SortOrder
    location?: SortOrder
    area?: SortOrder
    duration?: SortOrder
    client?: SortOrder
    year?: SortOrder
    image?: SortOrder
    images?: SortOrder
    description?: SortOrder
    descriptionEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    titleEn?: SortOrder
    category?: SortOrder
    location?: SortOrder
    area?: SortOrder
    duration?: SortOrder
    client?: SortOrder
    year?: SortOrder
    image?: SortOrder
    description?: SortOrder
    descriptionEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    titleEn?: SortOrder
    category?: SortOrder
    location?: SortOrder
    area?: SortOrder
    duration?: SortOrder
    client?: SortOrder
    year?: SortOrder
    image?: SortOrder
    description?: SortOrder
    descriptionEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    icon?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    subtitleVi?: SortOrder
    subtitleEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    tag?: SortOrder
    bulletsVi?: SortOrder
    bulletsEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    icon?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    subtitleVi?: SortOrder
    subtitleEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    tag?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    icon?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    subtitleVi?: SortOrder
    subtitleEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    tag?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NewsArticleCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    summaryVi?: SortOrder
    summaryEn?: SortOrder
    contentVi?: SortOrder
    contentEn?: SortOrder
    image?: SortOrder
    categoryVi?: SortOrder
    categoryEn?: SortOrder
    date?: SortOrder
    readTime?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsArticleAvgOrderByAggregateInput = {
    readTime?: SortOrder
  }

  export type NewsArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    summaryVi?: SortOrder
    summaryEn?: SortOrder
    image?: SortOrder
    categoryVi?: SortOrder
    categoryEn?: SortOrder
    date?: SortOrder
    readTime?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsArticleMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    summaryVi?: SortOrder
    summaryEn?: SortOrder
    image?: SortOrder
    categoryVi?: SortOrder
    categoryEn?: SortOrder
    date?: SortOrder
    readTime?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsArticleSumOrderByAggregateInput = {
    readTime?: SortOrder
  }

  export type PartnerCountOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    name?: SortOrder
    sectorVi?: SortOrder
    sectorEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    founded?: SortOrder
    hq?: SortOrder
    statLabelVi?: SortOrder
    statLabelEn?: SortOrder
    statValue?: SortOrder
    projectsVi?: SortOrder
    projectsEn?: SortOrder
    highlightVi?: SortOrder
    highlightEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerAvgOrderByAggregateInput = {
    order?: SortOrder
    founded?: SortOrder
  }

  export type PartnerMaxOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    name?: SortOrder
    sectorVi?: SortOrder
    sectorEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    founded?: SortOrder
    hq?: SortOrder
    statLabelVi?: SortOrder
    statLabelEn?: SortOrder
    statValue?: SortOrder
    highlightVi?: SortOrder
    highlightEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerMinOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    name?: SortOrder
    sectorVi?: SortOrder
    sectorEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    founded?: SortOrder
    hq?: SortOrder
    statLabelVi?: SortOrder
    statLabelEn?: SortOrder
    statValue?: SortOrder
    highlightVi?: SortOrder
    highlightEn?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerSumOrderByAggregateInput = {
    order?: SortOrder
    founded?: SortOrder
  }

  export type TimelineItemCountOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    year?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimelineItemAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type TimelineItemMaxOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    year?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimelineItemMinOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    year?: SortOrder
    titleVi?: SortOrder
    titleEn?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimelineItemSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type MemberCompanyCountOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    abbr?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    accent?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberCompanyAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type MemberCompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    abbr?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    accent?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberCompanyMinOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    abbr?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    descVi?: SortOrder
    descEn?: SortOrder
    accent?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberCompanySumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ProjectCreateimagesInput = {
    set: string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ProjectUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ServiceCreatebulletsViInput = {
    set: string[]
  }

  export type ServiceCreatebulletsEnInput = {
    set: string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ServiceUpdatebulletsViInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ServiceUpdatebulletsEnInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NewsArticleCreatecontentViInput = {
    set: string[]
  }

  export type NewsArticleCreatecontentEnInput = {
    set: string[]
  }

  export type NewsArticleUpdatecontentViInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NewsArticleUpdatecontentEnInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PartnerCreateprojectsViInput = {
    set: string[]
  }

  export type PartnerCreateprojectsEnInput = {
    set: string[]
  }

  export type PartnerUpdateprojectsViInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PartnerUpdateprojectsEnInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}