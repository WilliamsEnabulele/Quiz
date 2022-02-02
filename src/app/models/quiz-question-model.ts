export interface Question {
    response_code: number;
    id: string;
    results : {
      category: string;
      type: string;
      difficulty : string;
      question : string;
      correct_answer : string;
      incorrect_answers : Array<string>;
  }
  }