<script>

import { UsersService } from "@/data/api/users.service";
import MatchesTable from "../../components/matches/matches_table.vue";

export default {
  name: "Home",
  components: {
    MatchesTable
  },
  data() {
    return {
      user: {
        admin: false,
        steam_id: "",
        id: -1,
        super_admin: false,
        name: "",
        small_image: "",
        medium_image: "",
        large_image: ""
      } // should be object from JSON response
    };
  },
  async mounted() {
    this.user = await UsersService.IsLoggedIn();
  }
};
</script>

<template>
  <v-container class="home" fluid>
    <MatchesTable :user="user" />
  </v-container>
</template>
