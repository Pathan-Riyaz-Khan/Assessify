<template>
  <v-container>
    <v-app-bar elevation="1" style="height: 50px" color="background">
      <v-btn
        icon="mdi-arrow-left"
        class="mb-3"
        to="/admin/library/createdByMe"
      />
      <v-spacer />
      <v-btn
        prepend-icon="mdi-content-save"
        variant="tonal"
        color="primary"
        class="mb-4"
        to="/admin"
      >
        {{ $t("labels.publish") }}
      </v-btn>
    </v-app-bar>
    <v-row class="align-center justify-center">
      <v-col>
        <div class="d-flex pa-5">
          <div
            :class="[
              'text-h5',
              dark ? 'text-white' : 'text-primary',
              'font-weight-bold',
            ]"
          >
            {{ questions.length + " " + $t("labels.questions") }}
          </div>
          <v-spacer />

          <v-btn variant="outlined" @click="dialog = true" color="primary">{{
            $t("labels.addQuestion")
          }}</v-btn>
        </div>
      </v-col>
    </v-row>

    <div class="quiz-list-container">
      <v-virtual-scroll :items="questions" class="quiz-scroll">
        <template v-slot:default="{ item, index }">
          <v-card
            :key="item.id"
            max-width="100%"
            class="d-flex flex-row align-center ma-4"
            elevation="2"
          >
            <!-- Card Image -->
            <v-card-text>
              <v-row>
                <v-col cols="10">
                  <v-card-title class="text-truncate text-wrap">
                    {{ index + 1 + ". " + item.text }}
                  </v-card-title>
                  <v-row no-gutters class="ml-2">
                    <v-col
                      v-for="option in item.options"
                      :key="option.id"
                      cols="auto"
                    >
                      <v-card-subtitle class="px-1 pb-1">
                        <v-chip
                          :color="option.isCorrect == true ? 'green' : 'red'"
                          class="font-weight-bold"
                          variant="tonal"
                          style="
                            text-transform: none;
                            margin-right: 4px;
                            margin-bottom: 6px;
                          "
                        >
                          <v-icon
                            class="mr-1"
                            :color="option.isCorrect == true ? 'green' : 'red'"
                            :icon="
                              option.isCorrect == true
                                ? 'mdi-check'
                                : 'mdi-alpha-x'
                            "
                          />
                          {{ option.text }}
                        </v-chip>
                      </v-card-subtitle>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="auto">
                  <v-card-actions>
                    <v-btn
                      icon="mdi-pencil-outline"
                      @click="updateQuestion(item.id)"
                    />
                    <v-btn
                      icon="mdi-delete"
                      @click="deleteQuestionRequest(item.id)"
                    />
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
      </v-virtual-scroll>
    </div>
  </v-container>

  <v-dialog v-model="questionDeletionDialog" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-alert-circle-outline"
      variant="flat"
    >
      <v-card-text>
        {{ $t("messages.questionDeletionAlert") }}
      </v-card-text>

      <template v-slot:actions>
        <v-btn
          text="cancel"
          variant="tonal"
          style="text-transform: none"
          @click="questionDeletionDialog = false"
        />
        <v-btn
          style="text-transform: none"
          text="Delete"
          variant="tonal"
          @click="deleteQuestion(questionDeletionRequestId)"
        />
      </template>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialog" max-width="800" persistent>
    <v-form @submit.prevent="addQuestion()">
      <v-card>
        <v-card-text>
          <v-textarea
            v-model="question"
            variant="outlined"
            label="Enter your Question"
            :rules="rules"
          />

          <v-btn
            max-width="150px"
            max-height="150px"
            color="primary"
            class="mb-2"
            variant="flat"
            @click="increaseOption"
          >
            add option
          </v-btn>
          <p v-if="maxLimit" class="text-center text-red">
            {{ $t("messages.maxLimitReached") }}
          </p>

          <div v-for="index in optionCount" :key="index">
            <v-text-field
              v-model="options[index - 1]"
              variant="outlined"
              label="Option"
              append-inner-icon="mdi-delete"
              density="compact"
              clearable
              :rules="rules"
              @click:append-inner="deleteOption()"
            />
          </div>

          <v-select
            v-model="answer"
            label="Select Correct Option"
            variant="solo-filled"
            density="compact"
            :rules="rules"
            :items="options"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn @click="dialog = false" variant="outlined" color="primary">
            Cancel
          </v-btn>
          <v-btn type="submit" color="primary" variant="elevated">
            {{ $t("labels.save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAppTheme } from "@/composables/useTheme";
import { useI18n } from "vue-i18n";
import QuestionService from "@/services/questionService";
import { useQuestionStore } from "@/store/questions";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { computed } from "vue";
import type { QuestionRequest } from "@/types/request/question";

const { dark } = useAppTheme();
const dialog = ref(false);
const optionCount = ref(2);
const maxLimit = ref(false);

const question = ref("");
const options = ref([""]);
const answer = ref("");

const questionService = new QuestionService();
const questionStore = useQuestionStore();
const quizId = useRouter().currentRoute.value.query.quizId;
const parsedQuizId = quizId ? Number(quizId) : NaN;

onMounted(async function () {
  await questionService.GetQuestions(parsedQuizId).then((res) => {
    questionStore.setQuestions(res);
  });
});

const { t } = useI18n();
const rules = [(v: unknown) => !!v || t("messages.thisFieldIsRequired")];

const questions = computed(function () {
  return questionStore.questions;
});

console.log(questions);

const increaseOption = () => {
  if (optionCount.value >= 6) {
    maxLimit.value = true;
    return;
  }
  optionCount.value++;
};

const deleteOption = () => {
  if (optionCount.value > 2) {
    optionCount.value--;
    maxLimit.value = false;
  }
};

const addQuestion = async () => {
  if (!question.value || !options.value || !answer.value) return;
  const questionRequest: QuestionRequest = {
    Text: question.value,
    Options: options.value.map((option) => ({
      Text: option,
      IsCorrect: option === answer.value,
    })),
  };

  if (selectedQuestionIdforUpdate.value != 0) {
    try {
      await questionService
        .UpdateQuestion(
          parsedQuizId,
          questionRequest,
          selectedQuestionIdforUpdate.value
        )
        .then(() => {
          questionStore.questions = questionStore.questions.filter(
            (question) => question.id !== selectedQuestionIdforUpdate.value
          );
          questionStore.questions.push({
            id: selectedQuestionIdforUpdate.value,
            text: question.value,
            quizId: parsedQuizId,
            options: options.value.map((option, index) => ({
              id: index + 1,
              text: option,
              isCorrect: option === answer.value,
            })),
          });
        });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await questionService
        .AddQuestion(parsedQuizId, questionRequest)
        .then((res) => {
          questionStore.questions.push({
            id: res,
            text: question.value,
            quizId: parsedQuizId,
            options: options.value.map((option, index) => ({
              id: index + 1,
              text: option,
              isCorrect: option === answer.value,
            })),
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  dialog.value = false;
  question.value = "";
  options.value = [""];
  answer.value = "";
  optionCount.value = 2;
};

const questionDeletionRequestId = ref(0);
const questionDeletionDialog = ref(false);
const deleteQuestionRequest = function (id: number) {
  questionDeletionRequestId.value = id;
  questionDeletionDialog.value = true;
};
const deleteQuestion = async function (id: number) {
  questionDeletionDialog.value = false;
  try {
    await questionService.DeleteQuestion(parsedQuizId, id).then(() => {
      questionStore.questions = questionStore.questions.filter(
        (question) => question.id !== id
      );
    });
  } catch (error) {
    console.log(error);
  }
};

const selectedQuestionIdforUpdate = ref(0);

const updateQuestion = (id: number) => {
  const updateQuestionObject = questionStore.questions.find(
    (question) => question.id === id
  );
  selectedQuestionIdforUpdate.value = id;
  if (updateQuestionObject != null) {
    dialog.value = true;
    question.value = updateQuestionObject?.text;
    options.value = [""];
    answer.value = "";
    optionCount.value = 2;
  }
};
</script>
<style scoped>
.v-radio-group {
  margin-right: 0 !important;
}
.v-text-field {
  margin-left: 0 !important;
}
</style>
