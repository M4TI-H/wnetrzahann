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
    async initializeUser() {
      const supabase = useSupabaseClient();
      const { data } = await supabase.auth.getUser();
      this.user = data.user;
    },
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
    async changePassword(
      login: string,
      oldPassword: string,
      newPassword: string
    ) {
      const supabase = useSupabaseClient();
      this.loading = true;

      const { error: authDataError } = await supabase.auth.signInWithPassword({
        email: login.trim(),
        password: oldPassword,
      });

      if (authDataError) {
        this.loading = false;
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      this.loading = false;

      if (updateError) {
        this.loading = false;
        return;
      }

      await supabase.auth.signOut();
    },
  },
});
