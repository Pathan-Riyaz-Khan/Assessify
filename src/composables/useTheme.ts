import { computed } from 'vue';
import { useTheme } from "vuetify";

export function useAppTheme() {
    const theme = useTheme();

    const dark = computed(() => {
        return theme.current.value.dark;
    });

    const toggleTheme = () => {
        const newTheme = dark.value ? 'light' : 'dark';
        theme.global.name.value = newTheme;
        localStorage.setItem("theme", newTheme);
    };

    return { theme, dark, toggleTheme };
}