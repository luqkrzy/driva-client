export const PASSWORD_REGEX = '^[A-Za-z0-9]*';
export const NAME_REGEX = '^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*';

export enum Constant {
  USERNAME_REGEX = '^[A-Za-z0-9]*',
  NAME_REGEX = '^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*',
  EMAIL_REGEX = '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$',
  PHONE_REGEX = '^[0-9]{9,13}$',
  NUMBER_ONLY_REGEX = '^[0-9]*$',
  LETTERS_NUMBERS = '^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9_ ]*',
}
