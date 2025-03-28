<script lang="ts">
export default {
  name: 'HomePage',
}
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/User'
import type { DataTablePageEvent } from 'primevue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

type TListUsers = {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

onMounted(async () => {
  await fetchUser()
})

const page = ref<number>(0)
const fetchUser = async () => {
  const response = await userStore.listUser(page.value + 1)
  listDataUsers.value = response.data
  totalData.value = response.total
}

const totalData = ref<number>()
const listDataUsers = ref<TListUsers[]>([])
const dialogEditCreate = ref<boolean>(false)
const dialogHapus = ref<boolean>(false)

const name = ref<string>()
const job = ref<string>()

const dialogType = ref<'create' | 'edit'>('create')
const openedUserId = ref<number>()

const showDialog = (type: 'create' | 'edit', id: number = 0) => {
  dialogType.value = type
  dialogEditCreate.value = true
  openedUserId.value = id
}
const handlePagination = async (e: DataTablePageEvent) => {
  page.value = e.page
  await fetchUser()
}

const createUser = async () => {
  const response = await userStore.createUser({
    name: name.value ?? '',
    job: job.value ?? '',
  })
  await fetchUser()
  dialogEditCreate.value = false
}
const editUser = async () => {
  const response = await userStore.editUser(openedUserId.value ?? 0, {
    name: name.value ?? '',
    job: job.value ?? '',
  })
  await fetchUser()
  dialogEditCreate.value = false
}
const deleteUser = async () => {
  const response = await userStore.deleteUser(openedUserId.value ?? 0)
  await fetchUser()
  dialogHapus.value = false
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('login')
}
</script>

<template>
  <div>
    <div class="flex justify-between !mb-4">
      <Button
        @click="showDialog('create')"
        class="ml-auto"
        label="Tambah"
        icon="pi pi-plus"
        iconPos="right"
      />
      <Button
        @click="logout()"
        class="ml-auto"
        label="Logout"
        severity="danger"
        icon="pi pi-sign-out"
        iconPos="right"
      />
    </div>
    <DataTable
      @page="handlePagination"
      :value="listDataUsers"
      lazy
      paginator
      :rows="6"
      :totalRecords="totalData"
      tableStyle="min-width: 50rem"
    >
      <Column field="name" header="Name">
        <template #body="{ data }"> {{ data.first_name }} {{ data.last_name }} </template>
      </Column>
      <Column field="email" header="Email"></Column>
      <Column field="avatar" header="Avatar">
        <template #body="{ data }">
          <img :src="data.avatar" :alt="`avatar${data.id}`" />
        </template>
      </Column>
      <Column field="action" header="Action">
        <template #body="{ data }">
          <Button
            @click="showDialog('edit', data.id)"
            class="!mr-2"
            icon="pi pi-pencil"
            severity="warn"
          />
          <Button @click="dialogHapus = true" icon="pi pi-trash" severity="danger" />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="dialogEditCreate"
      modal
      :header="dialogType == 'create' ? 'Create User' : 'Edit User'"
      :style="{ width: '25rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block !mb-2">
        {{ dialogType == 'create' ? 'Insert' : 'Update' }} your information.
      </span>
      <div class="flex items-center gap-4 mb-4">
        <label for="name" class="font-semibold w-24">Name</label>
        <InputText v-model="name" id="name" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="job" class="font-semibold w-24">Job</label>
        <InputText v-model="job" id="job" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2 !mt-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="dialogEditCreate = false"
        ></Button>
        <Button
          v-if="dialogType == 'create'"
          type="button"
          label="Create"
          @click="createUser()"
        ></Button>
        <Button v-else type="button" label="Edit" severity="warn" @click="editUser()"></Button>
      </div>
    </Dialog>
    <Dialog v-model:visible="dialogHapus" modal header="Hapus User" :style="{ width: '25rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">
        Apakah anda ingin menghapus data ini?
      </span>
      <div class="flex justify-end gap-2 !mt-2">
        <Button type="button" label="Hapus" severity="danger" @click="deleteUser"></Button>
      </div>
    </Dialog>
  </div>
</template>
