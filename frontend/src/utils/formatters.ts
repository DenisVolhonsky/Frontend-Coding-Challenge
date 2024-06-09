import { HumanName, Maybe } from "../__generated__/graphql-generated";
// import dayjs, { Dayjs } from "dayjs"; // We use dayjs to handle and format dates easily.

/** Editable Code START **/
// HINT: you might want to create a formatter for addresses
/** Editable Code END **/

export const buildFullName = ({
  title,
  firstName,
  lastName,
  middleNames,
}: HumanName): string => {
  const ret: string[] = [];

  if (title) {
    ret.push(title);
  }
  if (firstName) {
    ret.push(firstName);
  }
  if (middleNames && middleNames.length > 0) {
    middleNames.forEach((middleName) => {
      if (middleName) {
        ret.push(middleName);
      }
    });
  }
  if (lastName) {
    ret.push(lastName);
  }

  return ret.join(" ");
};
