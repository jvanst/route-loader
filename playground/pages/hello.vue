<template>
  <div>
    <Form>
      <label>First name</label>
      <input type="text" name="firstName" :defaultValue="data.firstName" />
      <button>Submit</button>
    </Form>
  </div>
</template>

<script setup>
const data = useLoaderData()
</script>
