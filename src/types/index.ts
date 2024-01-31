type ErrorResponse = {
  data?: string;
  originalStatus?: number;
  status: string;
  error: string;
};

export type ErrorType = {
  error?: ErrorResponse;
};
