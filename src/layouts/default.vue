<script src="../router/index.js"></script><template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Quasar App
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-toolbar
        color="info"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title>
          BIRD
        </q-toolbar-title>
      </q-toolbar>

      <q-list
        separator
      >
        <q-collapsible v-for="(menu, index) in menus" :key="index" indent icon="mail" :label="menu.header.name">
          <q-item v-for="(item, idx) in menu.list" :key="idx" :to="item.url">
            <q-item-side icon="school" />
            <q-item-main :label="item.name" sublabel="quasar-framework.org" />
          </q-item>
        </q-collapsible>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { Vue } from 'vue'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      menus: []
    }
  },
  methods: {
    openURL
  },
  mounted () {
    this.$axios.get('api-system/menu/menu').then(res=>{
      for (var i = 0; i < res.data.length; i++) {
        this.menus.push(res.data[i])
      }
    })
  }
}
</script>

<style>
</style>
