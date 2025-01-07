<template>
    <div>
    <Header/>
    <div class="estilo-pagina">
    <br>  
    <br>
    

    <div class="saludo">
      <img :src="icono" alt="Saludo Icono" class="saludo-icono" />
      <span class="saludo-texto">
        {{ saludo }},
        <br />
        <strong>{{ nombreUsuario }}</strong>
      </span>
      
      <div class="icon-container">

      <div class="circle" style="background-color: var(--color-azul2);">

      <svg
        width="50"
        height="50"
        fill="currentColor"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        class="icon icono-azul"
      >
      <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/>
      <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/>
    </svg>
      </div>
      <span class="icon-text">Gerencia</span>
    </div>
    
    </div>

    <br>
    <br>
    <br>


    <div class="stats-container">
    <div class="stat-card" style="background-color:var(--primary-color); color: white">
      <div class="text-content">
        <p>Número de total de usuarios</p>
        <h2>{{ numeroUsuarios }}</h2></div>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="icon icono-blanco"
      >
        <path d="M17 24C20.8675 24 24 20.8675 24 17C24 13.1325 20.8675 10 17 10C13.1325 10 10 13.1325 10 17C10 20.8675 13.1325 24 17 24Z" fill="currentColor"/>
        <path d="M39 20.5C39 23.5387 36.5387 26 33.5 26C30.4613 26 28 23.5387 28 20.5C28 17.4612 30.4613 15 33.5 15C36.5387 15 39 17.4612 39 20.5Z" fill="currentColor"/>
        <path d="M17 26C19.7336 26 24.183 26.8511 27.1011 28.5452C28.293 29.7585 29 31.0814 29 32.4V38H4V32.4C4 28.144 12.6612 26 17 26Z" fill="currentColor"/>
        <path d="M44 38H31V32.4C31 30.9837 30.4886 29.6801 29.6764 28.5166C31.2173 28.1725 32.7343 28 33.8927 28C37.6211 28 44 29.7867 44 33.3333V38Z" fill="currentColor"/>
      </svg>
    </div>

    <div class="stat-card" style="background-color: var(--color-azul); color: var(--primary-color);">
      <div class="text-content">
      <p>Número de pacientes</p>
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

    <div class="stat-card" style="background-color: var(--color-verde); color: var(--primary-color);">

      <div class="text-content">
      <p>Número de médicos</p>
      <h2>{{ numeroMedicos }}</h2></div>
      <svg
       width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="icon icono-azul"
      >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M33.8336 13.8108C33.8336 17.2715 32.9737 21.7851 31.6512 21.0998C30.6493 24.3745 27.6028 26.7561 24 26.7561C19.8532 26.7561 16.4434 23.601 16.0399 19.5605C14.7272 17.2629 13.0049 12.6603 17.4321 9.07166C17.5111 9.04556 17.56 8.8302 17.6324 8.51185C17.9057 7.30885 18.5132 4.63511 22.3418 5.14555C25.295 5.53929 33.8337 7.06355 33.8336 13.8108ZM30.0281 15.992C30.0281 15.992 29.5764 17.3137 29.9999 18.7874C29.9831 22.0867 27.3033 24.7561 24 24.7561C20.7627 24.7561 18.1241 22.1922 18.0043 18.9841C18.1494 18.4342 18.1488 17.5027 18.1481 16.4682C18.1469 14.6012 18.1455 12.3989 19.0002 11.5C24.9889 15.4885 30.0281 15.992 30.0281 15.992Z"
        fill="currentColor"
      />
      <path
        d="M13 36C13 34.9177 13.5732 33.9692 14.4326 33.4416C14.4008 33.3213 14.3701 33.1958 14.3406 33.0669C14.2029 32.4653 14.0779 31.7335 13.9862 30.9988C13.9013 30.3182 13.8424 29.6146 13.831 28.993C9.60993 30.6499 6 33.5376 6 36.5699V42H42V36.5699C42 33.6661 38.6895 30.8949 34.7019 29.2101L34.7027 29.2376C34.7198 29.8478 34.6856 30.5473 34.6203 31.2213C34.56 31.8448 34.4711 32.4673 34.3643 33H35C35.3788 33 35.725 33.214 35.8944 33.5528L36.8944 35.5528C36.9639 35.6916 37 35.8448 37 36V38C37 38.5523 36.5523 39 36 39H34V37H35V36.2361L34.382 35H31.618L31 36.2361V37H32V39H30C29.4477 39 29 38.5523 29 38V36C29 35.8448 29.0361 35.6916 29.1056 35.5528L30.1056 33.5528C30.275 33.214 30.6212 33 31 33H32.3152C32.3369 32.9141 32.359 32.8188 32.3811 32.7144C32.4811 32.2429 32.5699 31.6456 32.6297 31.0287C32.6894 30.411 32.7177 29.798 32.7035 29.2937C32.6964 29.0411 32.6791 28.8313 32.6542 28.6699C32.6324 28.5281 32.6104 28.4627 32.6057 28.4487C32.6057 28.4486 32.6057 28.4488 32.6057 28.4487C32.6048 28.4459 32.6045 28.4451 32.6053 28.4466C32.6052 28.4464 32.6054 28.4468 32.6053 28.4466L32.6089 28.4456C32.0745 28.2798 31.5363 28.1348 31 28.0126C30.4972 27.8981 29.9775 28.5902 29.7493 29.0237H25.6851C24.7949 29.0239 24.342 29.0238 23.8968 29.0237H23.8813C23.4264 29.0236 22.9738 29.0235 22.0639 29.0237H18C17.9721 28.9707 17.9436 28.9139 17.9141 28.8551C17.7025 28.4331 17.4413 27.9121 17 28.0126C16.6151 28.1003 16.2293 28.1997 15.8446 28.3101C15.8334 28.4582 15.8279 28.6348 15.8292 28.8375C15.8327 29.3904 15.8856 30.0679 15.9709 30.7512C16.056 31.4332 16.1703 32.0972 16.2901 32.6206C16.3249 32.7725 16.3591 32.9079 16.3919 33.0254C17.8636 33.2174 19 34.476 19 36C19 37.6569 17.6569 39 16 39C14.3431 39 13 37.6569 13 36Z"
        fill="currentColor"
      />
    </svg>
    </div>  
    <div class="stat-card" style="background-color: var(--color-rojo); color: var(--primary-color);">

      <div class="text-content">
      <p>Número de administrativos</p>
      <h2>{{ numeroAdministrativos }}</h2></div>
      <svg
       width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="icon icono-azul"
      >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.407 15.0924C23.9122 15.5612 25.8082 17.7592 25.8082 20.4C25.8082 21.5193 25.4675 22.5591 24.8843 23.4214L38.7179 34.1598C39.0277 33.999 39.3796 33.9082 39.7528 33.9082C40.9954 33.9082 42.0028 34.9156 42.0028 36.1582C42.0028 37.4008 40.9954 38.4082 39.7528 38.4082C38.5102 38.4082 37.5028 37.4008 37.5028 36.1582C37.5028 36.0272 37.514 35.8988 37.5355 35.7739L23.4652 24.8516C22.5957 25.4498 21.5423 25.8 20.407 25.8C17.424 25.8 15.0059 23.3823 15.0059 20.4C15.0059 17.7593 16.9018 15.5613 19.407 15.0924L19.407 6H21.407L21.407 15.0924ZM22.2058 20.4C22.2058 21.3941 21.3999 22.2 20.4058 22.2C19.4117 22.2 18.6058 21.3941 18.6058 20.4C18.6058 19.4059 19.4117 18.6 20.4058 18.6C21.3999 18.6 22.2058 19.4059 22.2058 20.4Z" fill="currentColor"/>
      <path d="M27.6302 20.3838C27.6302 17.4693 25.8982 14.9593 23.407 13.8265L23.407 6.10596C27.6959 6.48295 29.9242 7.83422 31.9185 9.68342C32.0193 9.77691 32.1181 9.86765 32.2147 9.95633L32.2157 9.95727C33.0654 10.7376 33.7414 11.3583 34.0904 12.288C35.3931 15.7583 37.2059 20.5837 38.3244 23.5604C38.8157 24.8682 37.8481 26.2613 36.4511 26.2613H34.8187V28.5989L27.2439 22.7165C27.4943 21.9849 27.6302 21.2002 27.6302 20.3838Z" fill="currentColor"/>
      <path d="M17.407 13.8463L17.407 6.24136C8.41785 7.59417 6.00386 14.3005 6.00391 17.9747C6.00398 23.7418 9.68703 28.2157 11.4133 30.008V41.9996H28.5258V35.4877H32.8187C33.1213 35.4877 33.4083 35.4205 33.6654 35.3001L23.0804 27.08C22.2597 27.4051 21.3651 27.5838 20.4287 27.5838C16.4514 27.5838 13.2271 24.3602 13.2271 20.3838C13.2271 17.4862 14.9392 14.9884 17.407 13.8463Z" fill="currentColor"/>

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
              width="60"
              height="60"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icono-blanco"
            >
            <path d="M18 16.5C18 18.9862 15.9862 21 13.5 21C11.0138 21 9 18.9862 9 16.5C9 14.0138 11.0138 12 13.5 12C15.9862 12 18 14.0138 18 16.5Z" fill="currentColor"/>
            <path d="M4 28.3333C4 24.7867 10.3294 23 13.5 23C16.6706 23 23 24.7867 23 28.3333V36H4V28.3333Z" fill="currentColor"/>
            <path d="M39 16.5C39 18.9862 36.9863 21 34.5 21C32.0138 21 30 18.9862 30 16.5C30 14.0138 32.0138 12 34.5 12C36.9863 12 39 14.0138 39 16.5Z" fill="currentColor"/>
            <path d="M27 15C27 16.6575 25.6575 18 24 18C22.3425 18 21 16.6575 21 15C21 13.3425 22.3425 12 24 12C25.6575 12 27 13.3425 27 15Z" fill="currentColor"/>
            <path d="M25 28.3333C25 24.7867 31.3294 23 34.5 23C37.6706 23 44 24.7867 44 28.3333V36H25V28.3333Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.7508 22.185C28.4839 22.2831 28.2206 22.3873 27.9625 22.4975C26.7914 22.998 25.6088 23.6741 24.69 24.5785C24.444 24.8208 24.2105 25.0864 24 25.375C23.7895 25.0864 23.556 24.8208 23.3099 24.5785C22.3912 23.6741 21.2085 22.998 20.0374 22.4975C19.7794 22.3873 19.5161 22.2831 19.2491 22.185C20.7717 21.3961 22.7298 21 24 21C25.2701 21 27.2282 21.3961 28.7508 22.185Z" fill="currentColor"/>

            </svg>
          </div>
          <br>
          <span class="button-text">Usuarios</span>
        </button>
      </a>
  
      <a href="#" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg
              width="60"
              height="60"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icono-blanco"
            >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M37.9725 27.9747C39.2563 25.9594 40 23.5665 40 21C40 13.8203 34.1797 8 27 8C24.4335 8 22.0407 8.74375 20.0253 10.0275C18.6579 10.1048 17.3336 10.3437 16.0714 10.7254C18.8073 7.8165 22.6915 6 27 6C35.2843 6 42 12.7157 42 21C42 25.3085 40.1835 29.1927 37.2746 31.9286C37.6563 30.6664 37.8953 29.3422 37.9725 27.9747Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M39.9333 28.6028C39.2073 29.8352 38.3101 30.9547 37.2746 31.9286C37.6563 30.6664 37.8953 29.3422 37.9725 27.9747C37.9725 27.9749 37.9726 27.9745 37.9725 27.9747C39.256 25.9598 39.9997 23.5675 40 21.0015C40 21.001 40 21.0005 40 21C40 13.8203 34.1797 8 27 8C24.4335 8 22.0407 8.74375 20.0253 10.0275C20.0251 10.0275 20.0256 10.0275 20.0253 10.0275C18.6579 10.1048 17.3336 10.3437 16.0714 10.7254C17.0454 9.68988 18.1648 8.79277 19.3972 8.06676C21.6173 6.75886 24.2037 6.00629 26.9654 6.00004C26.9769 6.00001 26.9885 6 27 6C35.2843 6 42 12.7157 42 21C42 21.151 41.9978 21.3014 41.9934 21.4513C41.9164 24.0564 41.1752 26.4947 39.9333 28.6028Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M36 27C36 35.2843 29.2843 42 21 42C12.7157 42 6 35.2843 6 27C6 18.7157 12.7157 12 21 12C29.2843 12 36 18.7157 36 27ZM20 22C18.8954 22 18 22.8954 18 24C18 25.1046 18.8954 26 20 26V22ZM22 20V19H20V20C17.7909 20 16 21.7909 16 24C16 26.2091 17.7909 28 20 28V32C19.1307 32 18.3886 31.4449 18.1135 30.6668C17.9295 30.146 17.3582 29.8731 16.8375 30.0572C16.3167 30.2412 16.0438 30.8125 16.2279 31.3332C16.7765 32.8855 18.2568 34 20 34V35H22V34C24.2091 34 26 32.2091 26 30C26 27.7909 24.2091 26 22 26V22C22.8693 22 23.6114 22.5551 23.8865 23.3332C24.0705 23.854 24.6418 24.1269 25.1625 23.9428C25.6833 23.7588 25.9562 23.1875 25.7721 22.6668C25.2235 21.1145 23.7432 20 22 20ZM22 28V32C23.1046 32 24 31.1046 24 30C24 28.8954 23.1046 28 22 28Z" fill="currentColor"/>

            </svg>
          </div>
          <br>
          <span class="button-text">Finanzas</span>
        </button>
      </a>

      <a href="#" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg
              width="60"
              height="60"
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
          <span class="button-text">Aseguradoras</span>
        </button>
      </a>

      <a href="#" style="text-decoration: none; color: inherit;">
        <button class="caja-contenido" href="#">
          <div class="circle">
            <svg
              width="60"
              height="60"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icono-blanco"
            >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 20.5C6 12.4919 12.4919 6 20.5 6H27.5C35.5081 6 42 12.4919 42 20.5C42 28.5081 35.5081 35 27.5 35H26.8V42C26.8 42 6 38.5 6 20.5ZM27.6914 12.4815C28.7211 13.1664 29.4977 14.2754 29.4977 15.7611C29.4977 17.3398 28.8609 18.4998 27.8298 19.2103C27.4025 19.5047 26.9427 19.6971 26.5 19.8236V21.3559C26.5 22.1844 25.8284 22.8559 25 22.8559C24.1716 22.8559 23.5 22.1844 23.5 21.3559V18.5586C23.5 17.769 24.1121 17.1147 24.8999 17.062C25.4539 17.0249 25.8743 16.9146 26.1276 16.74C26.2342 16.6665 26.3107 16.5823 26.3681 16.4677C26.4278 16.3486 26.4977 16.1339 26.4977 15.7611C26.4977 15.4485 26.3747 15.2088 26.0299 14.9794C25.6378 14.7186 25.0078 14.5265 24.2513 14.5025C23.5028 14.4787 22.776 14.625 22.2418 14.884C21.7049 15.1443 21.5087 15.4358 21.4533 15.6513C21.2472 16.4537 20.4297 16.9371 19.6273 16.731C18.825 16.5249 18.3416 15.7074 18.5476 14.905C18.8921 13.5637 19.8955 12.6875 20.9331 12.1845C21.9733 11.6802 23.1959 11.4674 24.3467 11.504C25.4895 11.5403 26.7089 11.828 27.6914 12.4815ZM25 29C26.1046 29 27 28.1046 27 27C27 25.8954 26.1046 25 25 25C23.8954 25 23 25.8954 23 27C23 28.1046 23.8954 29 25 29Z" fill="currentColor"/>

            </svg>
          </div>
          <br>
          <span class="button-text">Encuestas</span>
        </button>
      </a>
    </div>

    <br>
    <br>

    <div class="insurance-box">
      <div class="icon-container" style="align-items: center; justify-content: center;">

        <div class="circle" style="background-color: var(--color-azul2);">

          <svg
              width="60"
              height="60"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icono-azul"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.671 6.80092C23.4182 5.73302 25.6603 5.73303 27.4076 6.80092L29.4455 8.04646C32.3025 9.79264 35.5581 10.1824 38.8277 10.5739C39.8847 10.7005 40.9432 10.8272 41.9901 11C41.9901 11 42.0132 12.8335 41.9889 13.6659L41.78 20.817C41.6008 26.9498 38.8735 32.7654 34.1951 36.991C31.988 38.9844 29.7054 40.7851 27.0825 42.2813C25.5274 43.1684 23.6035 43.2387 21.9814 42.4676C18.953 41.028 16.271 39.2023 13.8227 36.991C9.14422 32.7654 6.41696 26.9498 6.23778 20.817L6.02952 13.6887C6.00485 12.8445 6.02952 11 6.02952 11C6.8795 10.8996 7.74583 10.8173 8.61872 10.7344C12.4722 10.3682 16.4534 9.98986 19.7195 7.99367L21.671 6.80092ZM21.9998 22V15H25.9998V22H32.9998V26H25.9998V33H21.9998V26H14.9998V22H21.9998Z"
                fill="currentColor"
              />
          </svg>
        </div>
        <span class="icon-text" style="color: white; font-size: 30px; font-weight: 300; line-height: 1.1;">Compañías <br> aseguradoras</span>
        <div class="vertical-line" style="width: 1px;"></div>
        <p style="align-items: top;">Total:</p>
        <p style="align-items: top; font-size: 100px;">7</p>
        </div>


    </div>

        <br>
        <br>
        <br>




</div></div>
</template>
  
<script>
import apiClient from '@/apiClient';
import { useAuthStore } from '../../store/auth';
import Header from './Header.vue';


export default {
  name: "InicioGerencia",
  components: {
    Header,
  },
  data() {
    return {
      saludo: '',
      icono: '',
      usuarios: [],
      numeroUsuarios: '-',
      numeroPacientes: '-',
      numeroMedicos: '-',
      numeroAdministrativos: '-',
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
      } else if (hora < 20) {
        this.saludo = "Buenas tardes";
        this.icono = require('@/assets/icons/buenas_tardes.png');
      } else {
        this.saludo = "Buenas noches";
        this.icono = require('@/assets/icons/buenas_noches.png');
      }
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
        this.numeroAdministrativos = usuarios.filter(usuario => usuario.tipo === 'Administración').length;
      } catch (error) {
        console.error('Error al obtener los datos de usuarios:', error);
      }
    }

  },
  mounted() {
    this.actualizarSaludo();
    this.obtenerDatosUsuarios();
    setInterval(() => {
      this.obtenerDatosUsuarios();
    }, 60000); // Actualiza cada 1 minuto

  }
};
  </script>
  <style src="@/assets/styles.css"></style>
  <style scoped>


  .departamentos,
  .aseguradoras,
  .satisfaccion {
    margin: 20px 0;
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



.estilo-pagina {  
  margin-left: 2rem; 
  margin-right: 2rem;
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


.icono-blanco {
  color: #ffffff; 
}

.icono-azul {
  color: var(--primary-color);
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


.icon-container {
  display: flex;
  align-items: center;
  gap: 10px; /* Espacio entre el círculo y el texto */
  margin-left: auto;
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

/* Estilo del texto */
.icon-text {
  font-size: 44px;
  font-weight: 700; /* Aplica el estilo bold */
  color: var(--primary-color); /* Usa la variable CSS */
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

.button p {
  font-size: 18px;
  font-weight: bold;
  color: #162d57; /* Azul oscuro */
  margin: 0;
}












.insurance-section {
  background-color: #162d57; /* Azul oscuro */
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  gap: 20px; /* Espacio entre contenedores */
}



.title {
  font-size: 18px;
  margin: 0;
}

.subtitle {
  font-size: 16px;
  margin: 0;
}

.details-container {
  text-align: right;
}

.small-text {
  font-size: 14px;
  margin: 0;
  color: var(--color-azul2);
}

.highlight {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  color: white;
}

.button-text {
  font-size: 1.4rem;
  color: #162d57; /* Azul oscuro */
  margin: 0 auto;
}







.insurance-box {
  display: flex;
  flex-direction: column; /* Cambia a disposición vertical */
  align-items: center; /* Centra horizontalmente */
  justify-content: center; /* Centra verticalmente */
  background-color: var(--primary-color);
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  height: 100%; /* Asegúrate de que la caja tenga altura suficiente */
}


.icon-section {
  display: flex;
  align-items: center;
  gap: 8px;
}


.total-section {
  text-align: center;
}

.total-number {
  font-size: 24px;
  font-weight: bold;
}

.highlight-section {
  text-align: right;
  margin-left: auto;
}

.highlight {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

</style>
  