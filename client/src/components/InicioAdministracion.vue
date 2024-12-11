<template>
  <div class="estilo-pagina">
    <header class="header">
      <img src="@/assets/logo.png" alt="Hospital Rambla" class="logo" />
      <div class="vertical-line"></div>
      <h1 class="left-align small-text">INTRANET</h1>

      <div class="user-head">
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #92bdf6;">
          <path d="M6 36C6 31.0347 17.9925 28 24 28C30.0075 28 42 31.0347 42 36V42H6V36Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M24 26C29.5228 26 34 21.5228 34 16C34 10.4772 29.5228 6 24 6C18.4772 6 14 10.4772 14 16C14 21.5228 18.4772 26 24 26Z" fill="currentColor"/>
        </svg>
        <span> {{ nombreUsuario }} </span>
      </div>
      <div class="reloj">
        <span>{{ horaActual }}</span>
      </div>
    </header>
    <br>
    <br>  
    <br>
    
    <!-- Saludo y banner fraudes -->
    <div class="saludo">
      <img :src="icono" alt="Saludo Icono" class="saludo-icono" />
      <span class="saludo-texto">
        {{ saludo }},
        <br />
        <strong>{{ nombreUsuario }}</strong>
      </span>
      <div class="icon-container">

        <div class="circle">
        
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: white;">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.407 15.0924C23.9122 15.5612 25.8082 17.7592 25.8082 20.4C25.8082 21.5193 25.4675 22.5591 24.8843 23.4214L38.7179 34.1598C39.0277 33.999 39.3796 33.9082 39.7528 33.9082C40.9954 33.9082 42.0028 34.9156 42.0028 36.1582C42.0028 37.4008 40.9954 38.4082 39.7528 38.4082C38.5102 38.4082 37.5028 37.4008 37.5028 36.1582C37.5028 36.0272 37.514 35.8988 37.5355 35.7739L23.4652 24.8516C22.5957 25.4498 21.5423 25.8 20.407 25.8C17.424 25.8 15.0059 23.3823 15.0059 20.4C15.0059 17.7593 16.9018 15.5613 19.407 15.0924L19.407 6H21.407L21.407 15.0924ZM22.2058 20.4C22.2058 21.3941 21.3999 22.2 20.4058 22.2C19.4117 22.2 18.6058 21.3941 18.6058 20.4C18.6058 19.4059 19.4117 18.6 20.4058 18.6C21.3999 18.6 22.2058 19.4059 22.2058 20.4Z" fill="currentColor"/>
          <path d="M27.6302 20.3838C27.6302 17.4693 25.8982 14.9593 23.407 13.8265L23.407 6.10596C27.6959 6.48295 29.9242 7.83422 31.9185 9.68342C32.0193 9.77691 32.1181 9.86765 32.2147 9.95633L32.2157 9.95727C33.0654 10.7376 33.7414 11.3583 34.0904 12.288C35.3931 15.7583 37.2059 20.5837 38.3244 23.5604C38.8157 24.8682 37.8481 26.2613 36.4511 26.2613H34.8187V28.5989L27.2439 22.7165C27.4943 21.9849 27.6302 21.2002 27.6302 20.3838Z" fill="currentColor"/>
          <path d="M17.407 13.8463L17.407 6.24136C8.41785 7.59417 6.00386 14.3005 6.00391 17.9747C6.00398 23.7418 9.68703 28.2157 11.4133 30.008V41.9996H28.5258V35.4877H32.8187C33.1213 35.4877 33.4083 35.4205 33.6654 35.3001L23.0804 27.08C22.2597 27.4051 21.3651 27.5838 20.4287 27.5838C16.4514 27.5838 13.2271 24.3602 13.2271 20.3838C13.2271 17.4862 14.9392 14.9884 17.407 13.8463Z" fill="currentColor"/>
          </svg>

        </div>
        <span class="icon-text">Admisión</span>
      </div>
    </div>
    

    <br>
    <br>
    <br>

    <!-- Feed de datos -->
    <div class="stats-container">
      <div class="stat-card" style="background-color: var(--color-azul); color: var(--primary-color);">
        <div class="text-content">
        <p>Pacientes pendientes de validar</p>
        <h2>{{ numeroPacientes }}</h2></div>
        <svg
         width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="icon icono-azul"
        >
        <path d="M6 36C6 31.0347 17.9925 28 24 28C30.0075 28 42 31.0347 42 36V42H6V36Z" fill="currentColor"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 26C29.5228 26 34 21.5228 34 16C34 10.4772 29.5228 6 24 6C18.4772 6 14 10.4772 14 16C14 21.5228 18.4772 26 24 26Z" fill="currentColor"/>
        </svg>
      </div> 

      <div class="stat-card" style="background-color:var(--primary-color); color: white">
        <div class="text-content">
          <p>Médicos activos acutalmente</p>
          <h2>{{ numeroMedicos }}</h2></div>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M33.8336 13.8108C33.8336 17.2715 32.9737 21.7851 31.6512 21.0998C30.6493 24.3745 27.6028 26.7561 24 26.7561C19.8532 26.7561 16.4434 23.601 16.0399 19.5605C14.7272 17.2629 13.0049 12.6603 17.4321 9.07166C17.5111 9.04556 17.56 8.8302 17.6324 8.51185C17.9057 7.30885 18.5132 4.63511 22.3418 5.14555C25.295 5.53929 33.8337 7.06355 33.8336 13.8108ZM30.0281 15.992C30.0281 15.992 29.5764 17.3137 29.9999 18.7874C29.9831 22.0867 27.3033 24.7561 24 24.7561C20.7627 24.7561 18.1241 22.1922 18.0043 18.9841C18.1494 18.4342 18.1488 17.5027 18.1481 16.4682C18.1469 14.6012 18.1455 12.3989 19.0002 11.5C24.9889 15.4885 30.0281 15.992 30.0281 15.992Z" fill="currentColor"/>
          <path d="M13 36C13 34.9177 13.5732 33.9692 14.4326 33.4416C14.4008 33.3213 14.3701 33.1958 14.3406 33.0669C14.2029 32.4653 14.0779 31.7335 13.9862 30.9988C13.9013 30.3182 13.8424 29.6146 13.831 28.993C9.60993 30.6499 6 33.5376 6 36.5699V42H42V36.5699C42 33.6661 38.6895 30.8949 34.7019 29.2101L34.7027 29.2376C34.7198 29.8478 34.6856 30.5473 34.6203 31.2213C34.56 31.8448 34.4711 32.4673 34.3643 33H35C35.3788 33 35.725 33.214 35.8944 33.5528L36.8944 35.5528C36.9639 35.6916 37 35.8448 37 36V38C37 38.5523 36.5523 39 36 39H34V37H35V36.2361L34.382 35H31.618L31 36.2361V37H32V39H30C29.4477 39 29 38.5523 29 38V36C29 35.8448 29.0361 35.6916 29.1056 35.5528L30.1056 33.5528C30.275 33.214 30.6212 33 31 33H32.3152C32.3369 32.9141 32.359 32.8188 32.3811 32.7144C32.4811 32.2429 32.5699 31.6456 32.6297 31.0287C32.6894 30.411 32.7177 29.798 32.7035 29.2937C32.6964 29.0411 32.6791 28.8313 32.6542 28.6699C32.6324 28.5281 32.6104 28.4627 32.6057 28.4487C32.6057 28.4486 32.6057 28.4488 32.6057 28.4487C32.6048 28.4459 32.6045 28.4451 32.6053 28.4466C32.6052 28.4464 32.6054 28.4468 32.6053 28.4466L32.6089 28.4456C32.0745 28.2798 31.5363 28.1348 31 28.0126C30.4972 27.8981 29.9775 28.5902 29.7493 29.0237H25.6851C24.7949 29.0239 24.342 29.0238 23.8968 29.0237H23.8813C23.4264 29.0236 22.9738 29.0235 22.0639 29.0237H18C17.9721 28.9707 17.9436 28.9139 17.9141 28.8551C17.7025 28.4331 17.4413 27.9121 17 28.0126C16.6151 28.1003 16.2293 28.1997 15.8446 28.3101C15.8334 28.4582 15.8279 28.6348 15.8292 28.8375C15.8327 29.3904 15.8856 30.0679 15.9709 30.7512C16.056 31.4332 16.1703 32.0972 16.2901 32.6206C16.3249 32.7725 16.3591 32.9079 16.3919 33.0254C17.8636 33.2174 19 34.476 19 36C19 37.6569 17.6569 39 16 39C14.3431 39 13 37.6569 13 36Z" fill="currentColor"/>
          <path d="M17 36C17 36.5742 16.5384 37.0147 16 37.0147C15.4616 37.0147 15 36.5742 15 36C15 35.4258 15.4616 34.9853 16 34.9853C16.5384 34.9853 17 35.4258 17 36Z" fill="currentColor"/>
          </svg>
      </div>

      <!-- Placeholder para las autorizaciones-->
      <div class="stat-card" style="background-color:var(--color-verde); color: var(--primary-color)">
        <div class="text-content">
          <p>Autorizaciones pendientes de tramitar</p>
          <h2>{{ numeroUsuarios }}</h2></div>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M33.8336 13.8108C33.8336 17.2715 32.9737 21.7851 31.6512 21.0998C30.6493 24.3745 27.6028 26.7561 24 26.7561C19.8532 26.7561 16.4434 23.601 16.0399 19.5605C14.7272 17.2629 13.0049 12.6603 17.4321 9.07166C17.5111 9.04556 17.56 8.8302 17.6324 8.51185C17.9057 7.30885 18.5132 4.63511 22.3418 5.14555C25.295 5.53929 33.8337 7.06355 33.8336 13.8108ZM30.0281 15.992C30.0281 15.992 29.5764 17.3137 29.9999 18.7874C29.9831 22.0867 27.3033 24.7561 24 24.7561C20.7627 24.7561 18.1241 22.1922 18.0043 18.9841C18.1494 18.4342 18.1488 17.5027 18.1481 16.4682C18.1469 14.6012 18.1455 12.3989 19.0002 11.5C24.9889 15.4885 30.0281 15.992 30.0281 15.992Z" fill="currentColor"/>
          <path d="M13 36C13 34.9177 13.5732 33.9692 14.4326 33.4416C14.4008 33.3213 14.3701 33.1958 14.3406 33.0669C14.2029 32.4653 14.0779 31.7335 13.9862 30.9988C13.9013 30.3182 13.8424 29.6146 13.831 28.993C9.60993 30.6499 6 33.5376 6 36.5699V42H42V36.5699C42 33.6661 38.6895 30.8949 34.7019 29.2101L34.7027 29.2376C34.7198 29.8478 34.6856 30.5473 34.6203 31.2213C34.56 31.8448 34.4711 32.4673 34.3643 33H35C35.3788 33 35.725 33.214 35.8944 33.5528L36.8944 35.5528C36.9639 35.6916 37 35.8448 37 36V38C37 38.5523 36.5523 39 36 39H34V37H35V36.2361L34.382 35H31.618L31 36.2361V37H32V39H30C29.4477 39 29 38.5523 29 38V36C29 35.8448 29.0361 35.6916 29.1056 35.5528L30.1056 33.5528C30.275 33.214 30.6212 33 31 33H32.3152C32.3369 32.9141 32.359 32.8188 32.3811 32.7144C32.4811 32.2429 32.5699 31.6456 32.6297 31.0287C32.6894 30.411 32.7177 29.798 32.7035 29.2937C32.6964 29.0411 32.6791 28.8313 32.6542 28.6699C32.6324 28.5281 32.6104 28.4627 32.6057 28.4487C32.6057 28.4486 32.6057 28.4488 32.6057 28.4487C32.6048 28.4459 32.6045 28.4451 32.6053 28.4466C32.6052 28.4464 32.6054 28.4468 32.6053 28.4466L32.6089 28.4456C32.0745 28.2798 31.5363 28.1348 31 28.0126C30.4972 27.8981 29.9775 28.5902 29.7493 29.0237H25.6851C24.7949 29.0239 24.342 29.0238 23.8968 29.0237H23.8813C23.4264 29.0236 22.9738 29.0235 22.0639 29.0237H18C17.9721 28.9707 17.9436 28.9139 17.9141 28.8551C17.7025 28.4331 17.4413 27.9121 17 28.0126C16.6151 28.1003 16.2293 28.1997 15.8446 28.3101C15.8334 28.4582 15.8279 28.6348 15.8292 28.8375C15.8327 29.3904 15.8856 30.0679 15.9709 30.7512C16.056 31.4332 16.1703 32.0972 16.2901 32.6206C16.3249 32.7725 16.3591 32.9079 16.3919 33.0254C17.8636 33.2174 19 34.476 19 36C19 37.6569 17.6569 39 16 39C14.3431 39 13 37.6569 13 36Z" fill="currentColor"/>
          <path d="M17 36C17 36.5742 16.5384 37.0147 16 37.0147C15.4616 37.0147 15 36.5742 15 36C15 35.4258 15.4616 34.9853 16 34.9853C16.5384 34.9853 17 35.4258 17 36Z" fill="currentColor"/>
          </svg>
      </div>
      
      
    </div>
    <br>
    <br>

    <!-- Botones de acceso rápido -->
    <div class="button-container">
      <a href="#" style="text-decoration: none;">
        <button class="caja-contenido" href="#" >
          <div class="circle">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icono-blanco"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.671 6.80092C23.4182 5.73302 25.6603 5.73303 27.4076 6.80092L29.4455 8.04646C32.3025 9.79264 35.5581 10.1824 38.8277 10.5739C39.8847 10.7005 40.9432 10.8272 41.9901 11C41.9901 11 42.0132 12.8335 41.9889 13.6659L41.78 20.817C41.6008 26.9498 38.8735 32.7654 34.1951 36.991C31.988 38.9844 29.7054 40.7851 27.0825 42.2813C25.5274 43.1684 23.6035 43.2387 21.9814 42.4676C18.953 41.028 16.271 39.2023 13.8227 36.991C9.14422 32.7654 6.41696 26.9498 6.23778 20.817L6.02952 13.6887C6.00485 12.8445 6.02952 11 6.02952 11C6.8795 10.8996 7.74583 10.8173 8.61872 10.7344C12.4722 10.3682 16.4534 9.98986 19.7195 7.99367L21.671 6.80092ZM21.9998 22V15H25.9998V22H32.9998V26H25.9998V33H21.9998V26H14.9998V22H21.9998Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <br>
          <span class="button-text">Pacientes</span>
        </button>
      </a>
  
      <a href="#" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icono-blanco"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.671 6.80092C23.4182 5.73302 25.6603 5.73303 27.4076 6.80092L29.4455 8.04646C32.3025 9.79264 35.5581 10.1824 38.8277 10.5739C39.8847 10.7005 40.9432 10.8272 41.9901 11C41.9901 11 42.0132 12.8335 41.9889 13.6659L41.78 20.817C41.6008 26.9498 38.8735 32.7654 34.1951 36.991C31.988 38.9844 29.7054 40.7851 27.0825 42.2813C25.5274 43.1684 23.6035 43.2387 21.9814 42.4676C18.953 41.028 16.271 39.2023 13.8227 36.991C9.14422 32.7654 6.41696 26.9498 6.23778 20.817L6.02952 13.6887C6.00485 12.8445 6.02952 11 6.02952 11C6.8795 10.8996 7.74583 10.8173 8.61872 10.7344C12.4722 10.3682 16.4534 9.98986 19.7195 7.99367L21.671 6.80092ZM21.9998 22V15H25.9998V22H32.9998V26H25.9998V33H21.9998V26H14.9998V22H21.9998Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <br>
          <span class="button-text">Facturación</span>
        </button>
      </a>

      <a href="#" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icono-blanco"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.671 6.80092C23.4182 5.73302 25.6603 5.73303 27.4076 6.80092L29.4455 8.04646C32.3025 9.79264 35.5581 10.1824 38.8277 10.5739C39.8847 10.7005 40.9432 10.8272 41.9901 11C41.9901 11 42.0132 12.8335 41.9889 13.6659L41.78 20.817C41.6008 26.9498 38.8735 32.7654 34.1951 36.991C31.988 38.9844 29.7054 40.7851 27.0825 42.2813C25.5274 43.1684 23.6035 43.2387 21.9814 42.4676C18.953 41.028 16.271 39.2023 13.8227 36.991C9.14422 32.7654 6.41696 26.9498 6.23778 20.817L6.02952 13.6887C6.00485 12.8445 6.02952 11 6.02952 11C6.8795 10.8996 7.74583 10.8173 8.61872 10.7344C12.4722 10.3682 16.4534 9.98986 19.7195 7.99367L21.671 6.80092ZM21.9998 22V15H25.9998V22H32.9998V26H25.9998V33H21.9998V26H14.9998V22H21.9998Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <br>
          <span class="button-text">Autorizaciones</span>
        </button>
      </a>

      <a href="#" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icono-blanco"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.671 6.80092C23.4182 5.73302 25.6603 5.73303 27.4076 6.80092L29.4455 8.04646C32.3025 9.79264 35.5581 10.1824 38.8277 10.5739C39.8847 10.7005 40.9432 10.8272 41.9901 11C41.9901 11 42.0132 12.8335 41.9889 13.6659L41.78 20.817C41.6008 26.9498 38.8735 32.7654 34.1951 36.991C31.988 38.9844 29.7054 40.7851 27.0825 42.2813C25.5274 43.1684 23.6035 43.2387 21.9814 42.4676C18.953 41.028 16.271 39.2023 13.8227 36.991C9.14422 32.7654 6.41696 26.9498 6.23778 20.817L6.02952 13.6887C6.00485 12.8445 6.02952 11 6.02952 11C6.8795 10.8996 7.74583 10.8173 8.61872 10.7344C12.4722 10.3682 16.4534 9.98986 19.7195 7.99367L21.671 6.80092ZM21.9998 22V15H25.9998V22H32.9998V26H25.9998V33H21.9998V26H14.9998V22H21.9998Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <br>
          <span class="button-text">Citas</span>
        </button>
      </a>
    </div>

    <br>
    <br>

    <!-- Banner encuestas -->

    <div class="valora-experiencia-container">
      <div class="grafico">
        <svg class="donut" viewBox="0 0 36 36">
          <circle class="donut-ring" cx="18" cy="18" r="15.915"></circle>
          <circle class="donut-segment green" cx="18" cy="18" r="15.915" stroke-dasharray="50 50"></circle>
          <circle class="donut-segment yellow" cx="18" cy="18" r="15.915" stroke-dasharray="25 75" stroke-dashoffset="-50"></circle>
          <circle class="donut-segment red" cx="18" cy="18" r="15.915" stroke-dasharray="10 90" stroke-dashoffset="-75"></circle>
        </svg>
        <div class="grafico-texto">
          <span class="puntuacion">4.4/5</span>
          <br>
          <span class="descripcion">Satisfacción General con el Departamento de Admisión</span>
        </div>
      </div>
      <h2 class="titulo">Encuestas de satisfacción</h2>
      <button class="btn-encuestas">Ver resultados</button>
    </div>
    
  </div>
  </template>
  
<script>

import apiClient from '@/apiClient';
import { useAuthStore } from '../../store/auth';

export default {
  name: "InicioAdministracion",
  data() {
    return {
      saludo: '',
      icono: '',
      horaActual: '',
      numeroUsuarios: 'NaN',
      numeroPacientes: 'NaN',
      numeroMedicos: 'NaN',
    };
  },
  computed: {
    nombreUsuario() {
      const authStore = useAuthStore();
      return authStore.getUser ? authStore.getUser.nombre : 'Usuario';
    }
  },
  methods: {
    actualizarSaludo() {
      const ahora = new Date();
      const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
      const hora = horaCanarias.getHours();

      if (hora >= 6 && hora < 12) {
        this.saludo = "Buenos días";
        this.icono = require('@/assets/icons/buenos_dias.png');
      } else if (hora >= 13 && hora < 20) {
        this.saludo = "Buenas tardes";
        this.icono = require('@/assets/icons/buenas_tardes.png');
      } else {
        this.saludo = "Buenas noches";
        this.icono = require('@/assets/icons/buenas_noches.png');
      }
    },
    actualizarHora() {
      const ahora = new Date();
      const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
      this.horaActual = horaCanarias.toLocaleTimeString('es-ES', { hour12: false });
    },
    async obtenerDatosUsuarios() {
      try {
        const response = await apiClient.get('/api/usuarios'); // Ajusta la URL según tu API
        const usuarios = response.data;
        console.log('Usuarios:', usuarios);
        console.log('Número de usuarios:', usuarios.length);
        this.numeroUsuarios = usuarios.length;
        this.numeroPacientes = usuarios.filter(usuario => usuario.tipo === 'Paciente').length;
        this.numeroMedicos = usuarios.filter(usuario => usuario.tipo === 'Médico').length;
      } catch (error) {
        console.error('Error al obtener los datos de usuarios:', error);
      }
    }
  },
  mounted() {
    this.actualizarSaludo();
    this.actualizarHora();
    this.obtenerDatosUsuarios();
    setInterval(() => {
      this.obtenerDatosUsuarios();
    }, 60000); // Actualiza cada 1 minuto
    setInterval(() => {
      this.actualizarHora();
    }, 1000); // Actualiza la hora cada segundo
  }
};
  </script>
  <style src="@/assets/styles.css"></style>
  <style scoped>
  
  .header h1 {
    font-size: 24px;
  }
  
  .header span {
    color: var(--primary-color);
  }
  
  .departamento-info p {
    margin: 5px 0;
  }
  
  button {
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  button:hover {
    background: var(--color-azul);
  }

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: calc(100% - 0rem); 
  background-color: #e1e1e1;
  
  padding: 1rem;
  text-align: left;
  display: flex;

  align-items: left;
  justify-content: left;

  gap: 10px;
  border-radius: 15px; 
}


.estilo-pagina {  
  margin-left: 2rem; 
  margin-right: 2rem;
}
.header img.logo {
  width: 200px;
  height: auto; 
}
.header h1.left-align {
  text-align: left;
  margin-left: 10px; 
}
.header h1.small-text {
  font-size: 20px; 
  color: var(--primary-color);
  font-weight: 300;
}
.vertical-line {
  width: 4px;
  height: 70px;
  background-color: #92bdf6; 
}

.icono-blanco {
  color: #ffffff; 
}

.saludo {
  display: flex;
  align-items: center;
}

.saludo-icono {
  width: 150px;
  height: 150px;
  margin-right: 10px;
}

.saludo-texto {
  font-size: 45px; /* Ajusta el tamaño de la fuente */
  color: var(--primary-color);
  line-height: 1.2; /* Controla la separación entre líneas  */
}


.reloj {
  font-size: 24px;
  font-weight: bold;
}

/* Estilo del círculo */
.circle {
  width: 6rem; /* Tamaño del círculo */
  height: 6rem;
  border-radius: 50%; /* Hace que sea un círculo */
  background-color: var(--primary-color); /* Usa el color definido */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  margin: 0.5rem;
}




.button-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 0 auto;
}

.caja-contenido {
  background-color: var(--color-azul2);
  border-radius: 2rem; /* Bordes redondeados */
  width: 15rem; /* Ajusta el ancho */
  height: 15rem; /* Ajusta la altura */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button-text {
  font-size: 1.4rem;
  color: #162d57; /* Azul oscuro */
  margin: 0 auto;
}

.button p {
  font-size: 18px;
  font-weight: bold;
  color: #162d57; /* Azul oscuro */
  margin: 0;
}

.small-text {
  font-size: 14px;
  margin: 0;
  color: var(--color-azul2);
}

.user-head {
  position: relative;
  align-items: center;
  display: flex;
  margin-left: 2rem;
  justify-content: center;
}

.icon-container {
  display: flex;
  align-items: center;
  gap: 15px; /* Espacio entre el círculo y el texto */
  margin-left: auto;
}

.icon-text {
  font-size: 44px;
  font-weight: 700; /* Aplica el estilo bold */
  color: var(--primary-color); /* Usa la variable CSS */
}

.citas-container {
  margin: 1.5rem auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 3.5rem;
  border: 0.5rem solid #1c1c5a;
}

.header-citas {
  text-align: left;
  margin-bottom: 20px;
}

.header-ctitle {
  background-color: #1c1c5a;
  color: white;
  font-size: 1.5rem;
  border: none;
  padding: 10px 20px;
  border-radius: 4rem;
  cursor: default;
}

.citas-content {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.cita {
  flex: 1;
  background-color: #f4f9ff;
  border: 1px solid #d2e4fd;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icono {
  width: 40px;
  height: 40px;
  background-color: var(--color-azul2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icono::before {
  content: '+';
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
}

.detalles {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.fecha {
  font-weight: bold;
  font-size: 1rem;
}

.especialidad {
  color: var(--primary-color);
  font-size: 1.1rem;
  font-weight: bold;
}
.doctor {
  color: #6b6b6b;
  font-size: 0.9rem;
}

/* Botón Ver Más */
.ver-mas-container {
  text-align: center;
  margin-top: 20px;
}

.ver-mas {
  background-color: #cbe3fd;
  color: #1c1c5a;
  font-size: 1.5rem;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.ver-mas:hover {
  background-color: #b0d4fc;
}

.valora-experiencia-container {
  margin: 40px auto;
  padding: 10px;
  background-color: #ffffff;
  border: 0.5rem solid #aadcc6;
  border-radius: 2rem;
  text-align: center;
  position: relative;
}

/* Gráfico */
.grafico {
  position: relative;
  width: 20rem;
  height: 20rem;
  margin: 0 auto;
}

.donut {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.donut-ring {
  fill: none;
  stroke: #f4f4f4;
  stroke-width: 2.8;
}

.donut-segment {
  fill: none;
  stroke-width: 2.8;
}

.green {
  stroke: #aadcc6;
}

.yellow {
  stroke: #fcd77f;
}

.red {
  stroke: #f49797;
}

.grafico-texto {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.puntuacion {
  font-size: 2rem;
  font-weight: bold;
  color: #1c1c5a;
}

.descripcion {
  font-size: 1rem;
  color: #7a7a7a;
  margin-top: 5px;
}

.titulo {
  font-size: 3rem;
  font-weight: bold;
  color: #1c1c5a;
  margin: 0;
}

.btn-encuestas {
  margin: 20px;
  width: 15rem;
  background-color: #1c1c5a;
  color: white;
  font-size: 1.5rem;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.btn-encuestas:hover {
  background-color: #14143a;
}

.stats-container {
  display: flex;
  gap: 15px;
  justify-content: space-between; /* Espacio uniforme entre las tarjetas */
  width: 100%; /* Asegúrate de ocupar el ancho completo del contenedor */
}


.stat-card {
  display: flex;
  flex-direction: row; /* Alinear contenido en fila */
  align-items: center;
  justify-content: space-between;
  text-align: left;
  padding: 20px;
  flex: 1; /* Permitir que cada tarjeta crezca para ocupar el espacio disponible */
  min-width: 0; /* Prevenir problemas de desbordamiento */
  border-radius: 8px;
}

.stat-card h2 {
  margin: 0;
  font-weight: 800; /* Aplica el estilo extrabold */
}

.stat-card p,
.stat-card .text-content {
  flex: 1; /* Ocupa el espacio restante */
  font-weight: 300; /* Aplica el estilo light */
}

.stat-card .icon {
  margin-left: 10px; /* Separar el ícono del texto */
  width: 80px;
  height: 80px;
}

</style>
  