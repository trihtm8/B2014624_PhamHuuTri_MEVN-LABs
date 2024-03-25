<template>
    <div>
        <h2>Thêm Liên hệ mới</h2>
        <ContactForm
            :contact="newContact"
            @submit:contact="createContact"
        />
    </div>
</template>
  
<script>
    import ContactForm from "@/components/ContactForm.vue";
    import ContactService from "@/services/contact.service";
  
    export default {
        components: {
            ContactForm,
        },
        data() {
            return {
                newContact: {
                    name: "",
                    email: "",
                    address: "",
                    phone: "",
                    favorite: false,
                },
            };
        },
        methods: {
            async createContact(contactData) {
                try {
                    await ContactService.create(contactData);
                    this.$router.push({ name: "contactbook" });
                } catch (error) {
                    console.error(error);
                }
            },
        },
    };
</script>
  
<style scoped>
    @import "@/assets/form.css";
</style>