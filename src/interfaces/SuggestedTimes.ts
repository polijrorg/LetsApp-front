import Schedule from './Schedule';

export default interface SuggestedTimes {
  freeTimes: Schedule[];
  missingAuthentications: {
    google: string[];
    outlook: string[];
  };
}
