(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,a){e.exports=a(76)},40:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(22),s=a.n(l),o=a(7),i=a(8),c=a(10),h=a(9),d=a(2),u=a(11),m=a(31),g=a.n(m),p=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).handleClick=a.handleClick.bind(Object(d.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleClick",value:function(){this.props.handleToggle("loginForm")}},{key:"render",value:function(){var e=this;return r.a.createElement(g.a,null,r.a.createElement("h1",{style:{cursor:"pointer"},onClick:function(){e.handleClick()},className:"display-4"},"Reddit Aggregator"),r.a.createElement("p",{className:"lead"},"Personalized web app to collect the best daily Reddit submissions"))}}]),t}(r.a.Component),b=a(13),w=a.n(b),f=a(14),v=a.n(f),k=a(17),E=a.n(k),C=a(15),y=a.n(C),j=a(1),O=a.n(j),S=(a(40),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).state={handle:"",password:"",rememberMe:0},a.handleChange=a.handleChange.bind(Object(d.a)(a)),a.handleClick=a.handleClick.bind(Object(d.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){"handle"===e.target.id&&this.setState({handle:e.target.value}),"password"===e.target.id&&this.setState({password:e.target.value}),"rememberMe"===e.target.id&&this.setState({rememberMe:e.target.checked})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),fetch("http://localhost:5000/api/v1/login?handle="+this.state.handle+"&password="+this.state.password+"&rememberMe="+this.state.rememberMe).then(function(e){return e.json(e)}).then(function(e){e.loggedIn&&t.props.handleLogin(e)})}},{key:"handleClick",value:function(e){this.props.handleToggle(e)}},{key:"render",value:function(){var e=this;return r.a.createElement(v.a,{className:"login-form"},r.a.createElement(E.a,null,r.a.createElement(y.a,null,r.a.createElement(O.a,{onSubmit:this.handleSubmit},r.a.createElement("h3",null,"Please Sign In"),r.a.createElement(O.a.Group,{controlId:"handle"},r.a.createElement(O.a.Label,null,"Username or Email"),r.a.createElement(O.a.Control,{value:this.state.handle,onChange:this.handleChange,type:"email",placeholder:"Enter Username or Email"})),r.a.createElement(O.a.Group,{controlId:"password"},r.a.createElement(O.a.Label,null,"Password"),r.a.createElement(O.a.Control,{value:this.state.password,onChange:this.handleChange,type:"password",placeholder:"Password"})),r.a.createElement(O.a.Group,{controlId:"rememberMe"},r.a.createElement(O.a.Check,{onChange:this.handleChange,type:"checkbox",label:"Remember Me"})),r.a.createElement(w.a,{variant:"dark",type:"submit",block:!0},"Login")),r.a.createElement("p",{onClick:function(){e.handleClick("about")}},"New Here? Learn More & Sign Up!"),r.a.createElement("p",{onClick:function(){e.handleClick("forgotPassword")}},"Forgot Password?"))))}}]),t}(r.a.Component)),N=(a(52),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).handleClick=a.handleClick.bind(Object(d.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleClick",value:function(e){this.props.handleToggle(e)}},{key:"render",value:function(){var e=this;return r.a.createElement(v.a,{className:"about"},r.a.createElement("h2",null,"Who has time to be on Reddit all day?"),r.a.createElement("p",null,"Many Reddit posts get submitted throughout the day, and unless you can constantly check your reddit feed some content may be missed and buried by other submissions."),r.a.createElement("p",null,"Reddit Aggregator helps mitigate this problem by allowing you to create an account and submit a list of subreddits you enjoy. Reddit Aggregator will check the subreddits hourly and compile a list of entries throughout the day that match the subreddits you provide. These entries are bundled together into a nice readable format called a report. Users can have several reports for different purposes (each having their own set of subreddits)."),r.a.createElement("p",{className:"lead"},"Sound cool? Go ahead and sign up, it just takes a minute."),r.a.createElement(v.a,{style:{textAlign:"center"},className:"about-button-conatiner"},r.a.createElement(w.a,{size:"sm",variant:"dark",className:"about-button",onClick:function(){e.handleClick("signUpForm")}},"Sign Up"),r.a.createElement(w.a,{size:"sm",variant:"dark",className:"about-button",onClick:function(){e.handleClick("loginForm")}},"Back to Sign In")))}}]),t}(r.a.Component)),T=a(21),I=a.n(T),P=(a(53),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).handleClick=a.handleClick.bind(Object(d.a)(a)),a.handleChange=a.handleChange.bind(Object(d.a)(a)),a.createNewUser=a.createNewUser.bind(Object(d.a)(a)),a.handleAlert=a.handleAlert.bind(Object(d.a)(a)),a.state={username:"",email:"",password:"",passwordCheck:"",firstName:"",lastName:"",showWarning:!1,warning:""},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleClick",value:function(e){this.props.handleToggle(e)}},{key:"handleChange",value:function(e){"username"===e.target.id&&this.setState({username:e.target.value}),"email"===e.target.id&&this.setState({email:e.target.value}),"password"===e.target.id&&this.setState({password:e.target.value}),"passwordCheck"===e.target.id&&this.setState({passwordCheck:e.target.value}),"firstName"===e.target.id&&this.setState({firstName:e.target.value}),"lastName"===e.target.id&&this.setState({lastName:e.target.value})}},{key:"handleAlert",value:function(){var e=this;if(this.state.showWarning)return window.scrollTo(0,0),r.a.createElement(I.a,{onClose:function(){e.setState({showWarning:!1,alertShown:!1})},dismissible:!0,variant:"danger"},this.state.warning)}},{key:"createNewUser",value:function(e){var t=this;e.preventDefault(),this.state.password===this.state.passwordCheck?fetch("http://localhost:5000/api/v1/createUser",{method:"POST",mode:"cors",cache:"no-cache",credentials:"omit",headers:{"Content-Type":"application/json"},redirect:"follow",referrer:"no-referrer",body:JSON.stringify({username:this.state.username,email:this.state.email,password:this.state.password,firstName:this.state.firstName,lastName:this.state.lastName})}).then(function(e){return e.json()}).then(function(e){e.userCreated||"Error: username or email already exists"===e.reason&&t.setState({showWarning:!0,warning:"Username and/or Email Already In Use"})}):this.setState({showWarning:!0,warning:"Passwords Do Not Match"})}},{key:"render",value:function(){var e=this;return r.a.createElement(v.a,{className:"signup-form"},this.handleAlert(),r.a.createElement(E.a,null,r.a.createElement(y.a,null,r.a.createElement(O.a,{className:"signupForm",onSubmit:this.createNewUser},r.a.createElement("h3",null,"Sign Up"),r.a.createElement(O.a.Group,{controlId:"username"},r.a.createElement(O.a.Label,null,"Username"),r.a.createElement(O.a.Control,{value:this.state.username,onChange:this.handleChange,required:"required",type:"text",placeholder:"Enter a Username"})),r.a.createElement(O.a.Group,{controlId:"email"},r.a.createElement(O.a.Label,null,"Email"),r.a.createElement(O.a.Control,{value:this.state.email,onChange:this.handleChange,required:"required",type:"email",placeholder:"Enter your Email"})),r.a.createElement(O.a.Group,{controlId:"password"},r.a.createElement(O.a.Label,null,"Password"),r.a.createElement(O.a.Control,{value:this.state.password,onChange:this.handleChange,required:"required",type:"password",placeholder:"Password"})),r.a.createElement(O.a.Group,{controlId:"passwordCheck"},r.a.createElement(O.a.Label,null,"Retype Password"),r.a.createElement(O.a.Control,{value:this.state.passwordCheck,onChange:this.handleChange,required:"required",type:"password",placeholder:"Password"})),r.a.createElement(O.a.Group,{controlId:"firstName"},r.a.createElement(O.a.Label,null,"First Name"),r.a.createElement(O.a.Control,{value:this.state.firstName,onChange:this.handleChange,required:"required",type:"text",placeholder:"Enter Your First Name"})),r.a.createElement(O.a.Group,{controlId:"lastName"},r.a.createElement(O.a.Label,null,"Last Name"),r.a.createElement(O.a.Control,{value:this.state.lastName,onChange:this.handleChange,required:"required",type:"text",placeholder:"Enter Your Last Name"})),r.a.createElement(w.a,{variant:"dark",type:"submit",block:!0},"Create Account")))),r.a.createElement(v.a,{style:{textAlign:"center",marginBottom:"2rem"},className:"singup-button-conatiner"},r.a.createElement(w.a,{size:"sm",variant:"dark",className:"signup-button",onClick:function(){e.handleClick("loginForm")}},"Back to Sign In"),r.a.createElement(w.a,{size:"sm",variant:"dark",className:"signup-button",onClick:function(){e.handleClick("about")}},"Back to About")))}}]),t}(r.a.Component)),L=a(32),D=a.n(L),F=(a(74),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).state={email:""},a.handleClick=a.handleClick.bind(Object(d.a)(a)),a.handleChange=a.handleChange.bind(Object(d.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(a)),a.handleButtonText=a.handleButtonText.bind(Object(d.a)(a)),a.warning=a.warning.bind(Object(d.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleClick",value:function(e){this.props.handleToggle(e)}},{key:"handleButtonText",value:function(){return this.props.spinner?r.a.createElement(D.a,{size:"sm",animation:"grow",variant:"light"}):"Send Temporary Password"}},{key:"warning",value:function(){var e=this;if(this.props.showWarning)return r.a.createElement(I.a,{onClose:function(){e.props.closeWarning()},dismissible:!0,variant:"danger"},"That Email Is Not Registered")}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.requestNewPassword(this.state.email)}},{key:"handleChange",value:function(e){"email"===e.target.id&&this.setState({email:e.target.value})}},{key:"render",value:function(){var e=this;return r.a.createElement(v.a,{className:"forgot-password-form"},r.a.createElement(E.a,null,r.a.createElement(y.a,null,r.a.createElement(O.a,{onSubmit:this.handleSubmit},this.warning(),r.a.createElement("h3",null,"Forgot Password"),r.a.createElement(O.a.Group,{controlId:"email"},r.a.createElement(O.a.Label,null,"Enter Your Email"),r.a.createElement(O.a.Control,{value:this.state.email,onChange:this.handleChange,type:"email",placeholder:"Enter Email"})),r.a.createElement(w.a,{className:"forgot-password-button",variant:"dark",type:"submit",block:!0},this.handleButtonText())))),r.a.createElement(v.a,{style:{textAlign:"center"},className:"forgot-password-button-conatiner"},r.a.createElement(w.a,{size:"sm",variant:"dark",className:"about-button",onClick:function(){e.handleClick("loginForm")}},"Back to Sign In")))}}]),t}(r.a.Component)),W=(a(75),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).handleClick=a.handleClick.bind(Object(d.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleClick",value:function(){this.props.handleToggle("loginForm")}},{key:"render",value:function(){return r.a.createElement(v.a,{className:"new-password-sent-container"},r.a.createElement(E.a,null,r.a.createElement(y.a,null,r.a.createElement("p",{className:"lead"},"A temporary password has been sent to your email."),r.a.createElement(w.a,{onClick:this.handleClick,variant:"dark"},"Return to Sign In"))))}}]),t}(r.a.Component)),U=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).state={showForm:!0,showSpinner:!1,showWarning:!1},a.requestNewPassword=a.requestNewPassword.bind(Object(d.a)(a)),a.handleDisplay=a.handleDisplay.bind(Object(d.a)(a)),a.closeWarning=a.closeWarning.bind(Object(d.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleDisplay",value:function(){return this.state.showForm?r.a.createElement(F,{handleToggle:this.props.handleToggle,requestNewPassword:this.requestNewPassword,spinner:this.state.showSpinner,showWarning:this.state.showWarning,closeWarning:this.closeWarning}):r.a.createElement(W,{handleToggle:this.props.handleToggle})}},{key:"closeWarning",value:function(){this.setState({showWarning:!1})}},{key:"requestNewPassword",value:function(e){var t=this;this.setState({showSpinner:!0}),fetch("http://localhost:5000/api/v1/forgotPassword",{method:"POST",mode:"cors",cache:"no-cache",credentials:"omit",headers:{"Content-Type":"application/json"},redirect:"follow",referrer:"no-referrer",body:JSON.stringify({email:e})}).then(function(e){return e.json()}).then(function(e){e.result?t.setState({showForm:!1,showSpinner:!1}):(console.log(e),t.setState({showTrue:!1,showSpinner:!1,showWarning:!0}))})}},{key:"render",value:function(){return r.a.createElement("div",null,this.handleDisplay())}}]),t}(r.a.Component),q=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).state={show:"loginForm"},a.handleDisplay=a.handleDisplay.bind(Object(d.a)(a)),a.handleToggle=a.handleToggle.bind(Object(d.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleToggle",value:function(e){window.scrollTo(0,0),"loginForm"===e?this.setState({show:"loginForm"}):"about"===e?this.setState({show:"about"}):"signUpForm"===e?this.setState({show:"signUpForm"}):this.setState({show:"forgotPassword"})}},{key:"handleDisplay",value:function(){return"loginForm"===this.state.show?r.a.createElement(S,{handleLogin:this.props.handleLogin,handleToggle:this.handleToggle}):"about"===this.state.show?r.a.createElement(N,{handleToggle:this.handleToggle}):"signUpForm"===this.state.show?r.a.createElement(P,{handleToggle:this.handleToggle}):r.a.createElement(U,{handleToggle:this.handleToggle})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(p,{handleToggle:this.handleToggle}),this.handleDisplay())}}]),t}(r.a.Component),A=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).state={userData:null,loggedIn:!1,serverCheck:!1},a.handleDisplay=a.handleDisplay.bind(Object(d.a)(a)),a.handleLogin=a.handleLogin.bind(Object(d.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleDisplay",value:function(){var e=this;if(this.state.serverCheck)return this.state.loggedIn?r.a.createElement("div",null,"Yo"):r.a.createElement(q,{handleLogin:this.handleLogin});fetch("http://localhost:5000/api/v1/checkLoginStatus").then(function(e){return e.json()}).then(function(t){t.loggedIn?e.setState({loggedIn:!0,serverCheck:!0,userData:t.userData}):e.setState({loggedIn:!1,serverCheck:!0})})}},{key:"handleLogin",value:function(e){this.setState({userData:e.userData,loggedIn:e.loggedIn})}},{key:"render",value:function(){return r.a.createElement("div",{className:"app"},this.handleDisplay())}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[33,1,2]]]);
//# sourceMappingURL=main.eaf09074.chunk.js.map