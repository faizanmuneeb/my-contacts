export type Tag = {
  name: string;
  filters: object;
  validation: {
    type: string;
    format: string;
    enum: string[];
  };
  included: boolean;
  excluded: boolean;
};
