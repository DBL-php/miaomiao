<template>
  <div class="register_body">
    <div class="register_email">
      邮箱：
      <input class="register_text" type="text" v-model="email" />
      <button :disabled="disabled" @touchstart="handleToVerify">{{ verifyInfo }}</button>
    </div>
    <div>
      用户名：
      <input class="register_text" type="text" v-model="username" />
    </div>
    <div>
      密码：
      <input class="register_text" type="password" v-model="password" />
    </div>
    <div>
      确认密码：
      <input class="register_text" type="password" />
    </div>
    <div>
      验证码：
      <input class="register_text" type="text" v-model="verify" />
    </div>
    <div class="register_btn">
      <button @touchstart="handleToRegister">注册</button>
    </div>
    <div class="register_link">
      <router-link to="/mime/login">立即登录</router-link>
    </div>
  </div>
</template>

<script>
import { messageBox } from "@/components/JS";
export default {
  name: "register",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      verify: "",
      verifyInfo: '发送验证码',
      disabled: false,
      timer: null
    };
  },
  methods: {
    handleToRegister() {
      var This = this;
      this.axios
        .post("/api2/users/register", {
          email: this.email,
          username: this.username,
          password: this.password,
          verify: this.verify
        })
        .then(res => {
          var status = res.data.status;
          if (status === 0) {
            messageBox({
              title: "注册",
              content: "注册成功",
              ok: "确定",
              handleOk() {
                This.$router.push("/mime/login");
              }
            });
          } else {
            messageBox({
              title: "注册",
              content: res.data.msg + "请重试",
              ok: "确定"
            });
          }
        });
    },
    handleToVerify() {
      if(this.disabled)
        return
      this.axios.post("/api2/users/verify", { email: this.email }).then(res => {
        var status = res.data.status;
        var This=this
        if (status === 0) {
          messageBox({
            title: "验证码",
            content: "验证码已发送",
            ok: "确定",
            handleOk(){
              This.countDown()
            }
          });
        } else {
          messageBox({
            title: "验证码",
            content: "验证码发送失败",
            ok: "确定"
          });
        }
      });
    },
    countDown(){
      this.disabled = true
      var count = 10
      this.timer = setInterval(()=>{
        count--
        this.verifyInfo= '剩余' + count + 's'
        if(count === 0){
          count = 10
          this.disabled = false
          this.verifyInfo = '发送验证码'
          clearInterval(this.timer)
        }
      },1000)
    }
  }
};
</script>
<style scoped>
#content .register_body {
  width: 100%;
}
.register_body .register_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.register_body .register_btn {
  height: 50px;
  margin: 10px;
}
.register_body .register_btn button {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.register_body .register_link {
  display: flex;
  justify-content: space-between;
}
.register_body .register_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
.register_body .register_email {
  position: relative;
}
.register_body .register_email button {
  position: absolute;
  right: 5%;
  top: 10px;
  height: 30px;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  padding: 5px;
}
</style>