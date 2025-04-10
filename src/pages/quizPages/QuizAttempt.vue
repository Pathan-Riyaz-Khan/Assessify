<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="auto">
        <v-list
          active-color="primary"
          density="comfortable"
          max-width="100px"
          style="max-height: 650px; overflow-y: auto"
        >
          <v-list-item
            v-for="i in length"
            :key="i"
            :value="i"
            class="ma-2"
            @click="page = i"
          >
            <v-chip :color="getQuestionItemColor(i)" variant="elevated">
              {{ i }}
            </v-chip>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title class="d-flex">
                <div
                  :class="[
                    'text-h5',
                    dark ? 'text-white' : 'text-primary',
                    'font-weight-bold',
                  ]"
                >
                  {{ "Question: " + page + " / " + length }}
                </div>
                <v-spacer />
                <div
                  :class="[
                    'text-h5',
                    dark ? 'text-white' : 'text-primary',
                    'font-weight-bold',
                  ]"
                >
                  {{ "Marks:" }}
                </div>
                <v-chip color="success" variant="elevated" class="mx-1">
                  1+
                </v-chip>
                <v-chip color="error" variant="elevated" class="mx-1">
                  0-
                </v-chip>
              </v-card-title>
              <v-divider></v-divider>

              <v-card-text class="mt-4">
                {{ question.text }}
              </v-card-text>
              <v-card-text>
                <v-radio-group
                  v-for="option in question.options"
                  :key="option.id"
                  v-model="selectedOptionIds[page - 1]"
                >
                  <v-radio :label="option.text" :value="option.id" />
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <div>
                  <v-btn
                    v-if="page != 1"
                    color="primary"
                    variant="outlined"
                    class="mr-2"
                    @click="page--"
                  >
                    {{ $t("labels.previous") }}
                  </v-btn>
                  <v-btn
                    v-if="page != length"
                    color="primary"
                    variant="outlined"
                    class="mr-2"
                    @click="page++"
                  >
                    {{ $t("lables.next") }}
                  </v-btn>
                </div>
                <div v-if="page == length">
                  <v-btn
                    to="/user/dashboard"
                    color="primary"
                    variant="outlined"
                    @click="onSubmit()"
                  >
                    {{ $t("labels.submit") }}
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-chip color="primary" variant="elevated">
              {{ $t("messages.currentQuestion") }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-chip color="success" variant="elevated">
              {{ $t("messags.attempted") }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-chip variant="elevated" color="error">
              {{ $t("messages.notAttempted") }}
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
interface QuestionOptionList {
  QuestionId: number;
  OptionId: number;
}
import { ref } from "vue";
import { useQuestionStore } from "@/store/questions";
import { computed } from "vue";
import UserService from "@/services/userService";
import { useUserStore } from "@/store/user";
import type { UserQuestionOptionRequest } from "@/types/request/userQuestionOption";
import { useAppTheme } from "@/composables/useTheme";

const { dark } = useAppTheme();
const page = ref(1);
const questionStore = useQuestionStore();
const questions = computed(() => {
  return questionStore.questions;
});
const selectedOptionIds = ref(Array(questions.value.length).fill(0));
console.log(selectedOptionIds.value);
const question = computed(() => questions.value[page.value - 1]);
const length = ref(questions.value.length);
const userService = new UserService();

const getQuestionItemColor = function (index: number) {
  if (page.value == index) {
    return "primary";
  } else if (selectedOptionIds.value[index - 1] != 0) {
    return "success";
  } else {
    return "error";
  }
};

const onSubmit = async function () {
  const questionOptionList: QuestionOptionList[] = questions.value.map(
    (question, index) => {
      return {
        QuestionId: question.id,
        OptionId: selectedOptionIds.value[index],
      };
    }
  );
  const userStore = useUserStore();
  const userQuestionOption: UserQuestionOptionRequest = {
    QuizId: userStore.quiz.id,
    Options: questionOptionList,
  };

  try {
    await userService.UserQuestionOptions(userQuestionOption).then(async () => {
      return userService.GetUser().then((response) => {
        userStore.setUser(response);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
</script>
