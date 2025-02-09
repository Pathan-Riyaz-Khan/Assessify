<template>
  <div class="reports-container pa-4">
    <v-card elevation="4">
      <v-table>
        <thead>
          <tr>
            <th class="text-primary">{{ $t("labels.quizName") }}</th>
            <th class="text-primary">{{ $t("labels.totalParticipants") }}</th>
            <th class="text-primary">{{ $t("labels.accuracy") }}</th>
            <th class="text-primary">{{ $t("labels.createdAt") }}</th>
            <th class="text-primary">{{ $t("labels.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>Java</div>
            </td>
            <td>1</td>
            <td>
              <div color="text-sucess">100%</div>
            </td>
            <td>Oct 10, 2024</td>
            <td>
              <v-btn icon="mdi-delete-circle" elevation="0"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.reports-container {
  background: white;
  border-radius: 8px;
}
</style>
