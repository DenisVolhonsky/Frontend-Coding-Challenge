import { Address, HumanName } from "../__generated__/graphql-generated";

/** Editable Code START **/
// HINT: you might want to create a formatter for addresses
// I added a formatter for address as extra task but this part of code is not used in the task
// But it will be useful when we expand the table with address
export const formatAddress = ({ city, street, houseNumber }: Address): string => {
  const address = [ city, street, houseNumber ].filter(Boolean).join(', ') || "N/A"; // I added filter to remove empty strings
  return address;
}
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
