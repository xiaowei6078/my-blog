<template>
    <div class="login-box">
        <h3>登录</h3>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button>注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                userName: "",
                password: ""
            }
        };
    },
    methods: {
        onSubmit() {
            this.$http
                .login({
                    userName: this.form.userName,
                    password: this.form.password
                })
                .then(res => {
                    console.log(res);
                });
        }
    }
};
</script>

<style>
.login-box {
    width: 600px;
    margin: 0 auto;
    margin-top: 410px;
}
h3 {
    text-align: center;
    font-size: 40px;
}
</style>
