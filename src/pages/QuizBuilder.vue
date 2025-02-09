<template>
  <div class="quiz-builder">
    <h1>Create Quiz</h1>

    <div class="search-section">
      <h2>Search questions from Quizizz Library</h2>
      <div class="search-box">
        <input type="text" placeholder="Enter topic name" />
        <button class="search-btn">Search questions</button>
      </div>
    </div>

    <div class="questions-list">
      <QuizQuestion
        v-for="(question, index) in questions"
        :key="index"
        :questionNumber="index + 1"
        :initialQuestion="question.question"
        :initialChoices="question.choices"
        @delete-question="deleteQuestion(index)"
      />
    </div>

    <AddQuestionForm @question-added="addQuestion" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import QuizQuestion from "../components/QuizQuestion.vue";
import AddQuestionForm from "../components/AddQuestionForm.vue";

const questions = ref([
  {
    question: "what is nothing opposite",
    choices: [
      { text: "something", isCorrect: true },
      { text: "anything", isCorrect: false },
      { text: "everything", isCorrect: false },
      { text: "not a thing", isCorrect: false },
    ],
  },
]);

const addQuestion = (newQuestion) => {
  questions.value.push(newQuestion);
};

const deleteQuestion = (index) => {
  questions.value = questions.value.filter((_, i) => i !== index);
};
</script>

<style scoped>
.quiz-builder {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  gap: 10px;
}

.search-box input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-btn {
  background: #8b5cf6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
