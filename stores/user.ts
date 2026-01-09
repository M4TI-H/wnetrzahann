import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as any,
    loading: false as boolean,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    async signIn(login: string, password: string) {
      const supabase = useSupabaseClient();
      this.loading = true;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: login.trim(),
        password,
      });

      this.loading = false;

      if (error) {
        this.loading = false;
        return;
      }

      this.user = data.user;
    },
    async signOut() {
      const supabase = useSupabaseClient();
      this.loading = true;
      this.user = null;
      await supabase.auth.signOut();
      navigateTo("/admin");
      this.loading = false;
    },
  },
});
