/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface UpdateProfile {
  firstName: string;
  lastName: string;
  name: string;
  artistName?: string;
  jobTitle?: string;
  bio?: string;
  countryID: number;
  profileListItems: {
    title: string;
    header: string;
    description: string;
    dateString?: string | null;
    link?: string | null;
    [k: string]: unknown;
  }[];
  socialMedias: {
    platform: string;
    link: string;
    linkText: string;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}
