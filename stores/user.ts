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

      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: login.trim(),
          password,
        });

        if (error) throw error;

        const {
          data: { user },
        } = await supabase.auth.getUser();
        this.user = user;
      } finally {
        this.loading = false;
      }
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
      newPassword: string,
    ) {
      const supabase = useSupabaseClient();
      this.loading = true;
      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: login.trim(),
          password: oldPassword,
        });

        if (authError) throw authError;

        const { error: updateError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (updateError) throw updateError;

        await supabase.auth.signOut();
        this.user = null;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
