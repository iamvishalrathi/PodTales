/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as config from "../config.js";
import type * as files from "../files.js";
import type * as follows from "../follows.js";
import type * as freepik from "../freepik.js";
import type * as http from "../http.js";
import type * as migrations_addLikeFields from "../migrations/addLikeFields.js";
import type * as notifications from "../notifications.js";
import type * as podcasts_comments from "../podcasts/comments.js";
import type * as podcasts_core from "../podcasts/core.js";
import type * as podcasts_filters from "../podcasts/filters.js";
import type * as podcasts_helper from "../podcasts/helper.js";
import type * as podcasts_index from "../podcasts/index.js";
import type * as podcasts_social from "../podcasts/social.js";
import type * as podcasts from "../podcasts.js";
import type * as reports from "../reports.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  config: typeof config;
  files: typeof files;
  follows: typeof follows;
  freepik: typeof freepik;
  http: typeof http;
  "migrations/addLikeFields": typeof migrations_addLikeFields;
  notifications: typeof notifications;
  "podcasts/comments": typeof podcasts_comments;
  "podcasts/core": typeof podcasts_core;
  "podcasts/filters": typeof podcasts_filters;
  "podcasts/helper": typeof podcasts_helper;
  "podcasts/index": typeof podcasts_index;
  "podcasts/social": typeof podcasts_social;
  podcasts: typeof podcasts;
  reports: typeof reports;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
