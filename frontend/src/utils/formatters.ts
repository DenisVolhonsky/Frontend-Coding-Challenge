import { HumanName, Maybe } from "../__generated__/graphql-generated";
import dayjs, { Dayjs } from "dayjs"; // We use dayjs to handle and format dates easily.

/** Editable Code START **/
// HINT: you might want to create a formatter for addresses
interface Address {
  houseNumber?: Maybe<string>;
  street?: Maybe<string>;
  city?: Maybe<string>;
  addition?: Maybe<string>;
}
// I added function which take object of address and return formatted string excluding null or undefined values
export const formatAddress = (address: Address): string => {
  const { houseNumber, street, city, addition } = address;
  return [houseNumber, street, city, addition].filter(Boolean).join(", ");
};


// Function to format date string to Dayjs object 
// Example: 1995-12-17T02:24:00.000Z-->Sun, 17 Dec 1995 02:24:00 GMT
export const formatDate = (dateString: string | undefined): Dayjs | null => {
    return dateString ? dayjs(dateString) : null;
  };
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
