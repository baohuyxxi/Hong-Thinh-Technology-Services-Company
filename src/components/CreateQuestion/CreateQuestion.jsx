import React, { useState } from "react";
import "./CreateQuestion.scss";
import ChoiceQuestion from "../ChoiceQuestion/ChoiceQuestion";
import FreeTextQuestion from "../FreeTextQuestion/FreeTextQuestion";
import ImageAPI from "~/services/apis/ImageAPI";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const CreateQuestion = ({
  question,
  handleQuestionChange,
  handleAnswerChange,
  handleAddAnswer,
  handleRemoveAnswer,
  handleRemoveQuestion,
  qIndex,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleQuestionChange(qIndex, "images", [reader.result]);
      };
      reader.readAsDataURL(file);
      const uploadResponse = await ImageAPI.uploadSingle(file);
      handleQuestionChange(qIndex, "images", [uploadResponse.data.link]);
    }
  };

  return (
    <div className="create-question" key={qIndex}>
      <div className="flex-space-between">
        <label className="create-question__label">Câu {qIndex + 1}</label>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => handleRemoveQuestion(qIndex)}
        >
          {isHovered ? (
            <DeleteForeverOutlinedIcon style={{ color: "red" }} />
          ) : (
            <DeleteOutlineIcon />
          )}
        </div>
      </div>

      <textarea
        className="create-question__textarea"
        placeholder="Nội dung câu hỏi"
        value={question.content}
        onChange={(e) =>
          handleQuestionChange(qIndex, "content", e.target.value)
        }
      />
      {question.images.length > 0 &&
        question.images.map((image, index) => (
          <div   key={index}>
            {typeof image === "string" ? (
              <img
              
                src={image}
                alt="Question"
                className="create-question__selected-image"
              />
            ) : (
              <>
                <img
             
                  src={URL.createObjectURL(image)}
                  alt="Question"
                  className="create-question__selected-image"
                />
              </>
            )}
          </div>
        ))}
      <div>
        <input
          className="create-question__image-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id={`file-input-${qIndex}`}
        />
        <button
          type="button"
          onClick={() =>
            document.getElementById(`file-input-${qIndex}`).click()
          }
          className="create-question__image-button"
        >
         {
          question.images.length > 0 ? "Thay đổi ảnh" : "Thêm ảnh"
         }
        </button>
      </div>

      <div className="create-question__type">
        <span className="create-question__type-label">Loại câu hỏi</span>
        <select
          className="create-question__type-select"
          onChange={(e) =>
            handleQuestionChange(qIndex, "typeQ", e.target.value)
          }
          value={question.typeQ}
        >
          <option value="CHOICE">Chọn đáp án đúng</option>
          <option value="FREETEXT">Trả lời tự do</option>
        </select>
        {question.typeQ === "CHOICE" && (
          <ChoiceQuestion
            question={question}
            handleQuestionChange={handleQuestionChange}
            handleAnswerChange={handleAnswerChange}
            handleAddAnswer={handleAddAnswer}
            qIndex={qIndex}
            handleRemoveAnswer={handleRemoveAnswer}
          />
        )}
      </div>
      {question.typeQ === "FREETEXT" && (
        <FreeTextQuestion
          question={question}
          handleQuestionChange={handleQuestionChange}
          handleAnswerChange={handleAnswerChange}
          handleAddAnswer={handleAddAnswer}
          handleRemoveAnswer={handleRemoveAnswer}
          qIndex={qIndex}
        />
      )}
    </div>
  );
};

export default CreateQuestion;
