<template>
    <div>
        <CreateForm @submit:contact="createContact" />
    </div>
</template>
  
<script>
    import CreateForm from "@/components/CreateForm.vue";
    import ContactService from "@/services/contact.service";
  
    export default {
        components: {
            CreateForm,
        },
        methods: {
            async createContact(contactData) {
                try {
                    await ContactService.create(contactData);
                    this.$router.push({ name: "contact.all" });
                } catch (error) {
                    console.error(error);
                }
            },
        },
    };
</script>