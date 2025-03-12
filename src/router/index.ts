import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/teams',
    name: 'Teams',
    component: () => import('../views/teams/teams.vue'),
    children: [
      {
        path: '/:id',
        name: 'Team',
        component: () => import('../views/teams/team.vue'),
      },
      {
        path: '/create',
        name: 'Create Team',
        component: () => import('../views/teams/team.vue'),
      },
    ],
  },
  {
    path: '/matches',
    name: 'Matches',
    component: () => import('../views/matches/matches.vue'),
    children: [
      {
        path: '/:id',
        name: 'Match',
        component: () => import('../views/matches/match.vue'),
      },
      {
        path: '/matches/create',
        name: 'New Match',
        component: () => import('../views/matches/create_match.vue'),
      },
    ],
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/users/user.vue'),
  },
  {
    path: '/user',
    name: 'My User',
    component: () => import('../views/users/user.vue'),
  },
  {
    path: '/seasons',
    name: 'Seasons',
    component: () => import('../views/seasons/seasons.vue'),
    children: [
      {
        path: '/seasons/:id',
        name: 'Season',
        component: () => import('../views/seasons/season.vue'),
      },
    ],
  },
  {
    path: '/servers',
    name: 'Servers',
    component: () => import('../views/servers/servers.vue'),
  },
  {
    path: '/metrics',
    name: 'Metrics',
    component: () => import('../views/metrics.vue'),
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: () => import('../views/leaderboards/player_leaderboard.vue'),
    children: [
      {
        path: '/leaderboard/:seasonid',
        name: 'SeasonPlayerBoard',
        component: () => import('../views/leaderboards/player_leaderboard.vue'),
      },
      {
        path: '/leaderboard/teams',
        name: 'TeamBoard',
        component: () => import('../views/leaderboards/team_leaderboard.vue'),
      },
      {
        path: '/leaderboard/:seasonid/teams',
        name: 'SeasonTeamBoard',
        component: () => import('../views/leaderboards/team_leaderboard.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
