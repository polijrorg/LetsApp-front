// src/utils/eventUtils.ts
import moment from 'moment-timezone';

export function buildDateTime(date: Date, time: Date): string {
  return moment(date)
    .set({
      hour: moment(time).get('hour'),
      minute: moment(time).get('minute'),
    })
    .tz('America/Sao_Paulo')
    .format();
}

export function validateFormInputs({
  title,
  online,
  address,
  setTitleError,
  setAddressError,
}: {
  title: string;
  online: boolean;
  address: string;
  setTitleError: (val: boolean) => void;
  setAddressError: (val: boolean) => void;
}): boolean {
  let isValid = true;

  if (!title) {
    setTitleError(true);
    isValid = false;
  } else {
    setTitleError(false);
  }

  if (!online && !address) {
    setAddressError(true);
    isValid = false;
  } else {
    setAddressError(false);
  }

  return isValid;
}