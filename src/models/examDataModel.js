import moment from "moment";
export const ExamDataModel = {
  type: "EXAM",
  classId: "",
  chapterId: "",
  examId: "",
  name: "",
  description: "",
  time: 60,
  startTime: moment().format("YYYY-MM-DDTHH:mm"),
  endTime: moment().add(60, "minutes").format("YYYY-MM-DDTHH:mm"),
  active: true,
  questions: [
    {
      sentenceNumber: 1,
      typeQ: "CHOICE",
      content: "",
      images: [],
      answers: [
        {
          content: "",
          correct: "A",
          point: 1,
        },
      ],
    },
  ],
  numberOfAttempts: 1,
};

// "questions": [
//   {
//       "sentenceNumber": 1,
//       "typeQ": "CHOICE",
//       "content": "",
//       "images": [
//           "https://mathx.vn/uploads/images/Screenshot%202023-12-15%20093716.jpg"
//       ],
//       "answers": [
//           {
//               "content": "",
//               "correct": "A",
//               "point": 1
//           }
//       ]
//   },
