<template>
  <div class="FindPassword_body">
    <div class="FindPassword_email">
      邮箱：
      <input class="FindPassword_text" type="text" v-model="email" />
      <button @touchstart="handleToVerify" :disabled="disabled">{{ verifyInfo }}</button>
    </div>
    <div>
      密码：
      <input class="FindPassword_text" type="password" v-model="password" />
    </div>
    <div>
      验证码：
      <input class="FindPassword_text" type="text" v-model="verify" />
    </div>
    <div class="FindPassword_btn">
      <button @touchstart="handleToFindPassword">修改</button>
    </div>
    <div class="FindPassword_link">
      <router-link to="/mime/login">立即登录</router-link>
    </div>
  </div>
</template>

<script>
import { messageBox } from "@/components/JS";

export default {
  name: "findpassword",
  data() {
    return {
      password: "",
      email: "",
      verify: "",
      verifyInfo:'发送验证码',
      disabled: false,
      timer: null
    };
  },
  methods: {
    handleToFindPassword() {
      var This = this;
      this.axios
        .post("/api2/users/findPassword", {
          email: this.email,
          password: this.password,
          verify: this.verify
        })
        .then(res => {
          var status = res.data.status;
          if (status === 0) {
            messageBox({
              title: "找回密码",
              content: "找回密码成功",
              ok: "确定",
              handleOk() {
                This.$router.push("/mime/login");
              }
            });
          } else {
            messageBox({
              title: "找回密码",
              content: res.data.msg + "请重试",
              ok: "确定"
            });
          }
        });
    },
    handleToVerify() {
      this.axios.post("/api2/users/verify", { email: this.email }).then(res => {
        var status = res.data.status;
        var This = this
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
#content .FindPassword_body {
  width: 100%;
}
.FindPassword_body .FindPassword_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.FindPassword_body .FindPassword_btn {
  height: 50px;
  margin: 10px;
}
.FindPassword_body .FindPassword_btn button {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.FindPassword_body .FindPassword_link {
  display: flex;
  justify-content: space-between;
}
.FindPassword_body .FindPassword_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
.FindPassword_body .FindPassword_email {
  position: relative;
}
.FindPassword_body .FindPassword_email button {
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