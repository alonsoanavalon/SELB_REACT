let cacheData = "app-v4";
this.addEventListener("install", evt => {
    console.log("installing")

    caches.delete("app-v1")
    caches.delete("app-v2")
    caches.delete("app-v3")
    // caches.delete("app-v4")
    caches.delete("app-v5")
    caches.delete("app-v6")
    caches.delete("app-v7")
    caches.delete("app-v8")
    caches.delete("app-v9")
    caches.delete("app-v10")
    caches.delete("app-v11")


    evt.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/logo192.png',
                '/manifest.json',
                '/static/js/bundle.js',
                '/login',
                '/index.html',
                '/',
                '/users',
                '/about',
                '/images/daughter.png',
                '/images/son.png',
                '/images/man.png',
                '/sounds/ahora.mp3',
                '/students',
                '/desarrollo',
                '/menu.png',
                '/instruments',
                '/items',
                '/tejaslee',
                '/calculo',
                '/excel',
                '/sdq',
                '/wally',
                '/aces',
                '/hnf',
                '/fonologico',
                '/corsi',
                'https://cdnjs.cloudflare.com/ajax/libs/hamburgers/1.1.3/hamburgers.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
                '/images/angry.png',
                '/images/sad.png',
                '/images/smiling-face.png',
                '/images/poker-face.png',
                '/images/flower.png',
                '/images/flowers-1.png',
                '/images/flowers-2.png',
                '/images/flor.png',
                '/images/heart.png',
                '/images/corazon.png',
                '/images/corazon-1.png',
                '/images/audio-headset.png',
                '/images/check.png',
                '/images/play-button.png',
                '/images/corazon-2.png',
                './sounds/go.mp3',
                'https://fonts.googleapis.com/css2?family=Kanit:wght@800;900&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap',
                "https://res.cloudinary.com/keyzen/image/upload/v1645727162/selb/tejaslee/book/01_pzeieo.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1645727162/selb/tejaslee/book/02_kphnm6.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1645727162/selb/tejaslee/book/03_dzroa9.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1645727162/selb/tejaslee/book/04_coezzz.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1645727162/selb/tejaslee/book/05_vulpgq.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1645727162/selb/tejaslee/book/06_e1a2h1.jpg",
                'https://res.cloudinary.com/keyzen/image/upload/v1644189007/selb/tejaslee/book/book14_k6196i.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189009/selb/tejaslee/book/book1_fzvvan.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644351020/selb/tejaslee/book/Screenshot_18_pxylv7.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644355210/selb/tejaslee/book/Screenshot_20_vmvywo.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189198/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0003_wtwnjy.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189199/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0004_hdo5eo.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189200/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0005_j6sgyr.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189201/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0006_eoh8si.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189202/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0007_qzv77w.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189203/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0008_ufkg3s.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189204/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0009_tnxoys.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189205/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0010_lyoed8.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189206/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0011_drlmt0.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189207/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0012_qgnety.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189208/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0013_zrofvb.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189209/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0014_qox0yz.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189210/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0015_ucxukv.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189211/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0016_m8quue.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189213/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0017_cttbw8.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189217/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0019_y2zpj4.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189219/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0020_lvkfdi.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189221/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0021_c9pmgj.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189223/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0022_zjiyu8.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189225/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0023_nwk3k2.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189227/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0024_fxznze.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189228/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0025_guyczb.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189229/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0026_roi3co.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189230/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0027_bbynln.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189231/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0028_g3wy3c.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189232/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0029_vg5uns.jpg',
                'https://res.cloudinary.com/keyzen/image/upload/v1644189233/selb/tejaslee/Tejas%20Lee%20-%20JPG%20Est%C3%ADmulos%20%28identificaci%C3%B3n%20de%20letras%29/Tejas_Lee_-_PPT_Est%C3%ADmulos_Identificaci%C3%B3n_letras_.ppt_page-0030_wznb1t.jpg',
                'https://res.cloudinary.com/keyzen/video/upload/v1644189037/selb/tejaslee/Tejas_Lee_-_audio_comprensi%C3%B3n_auditiva_NT1_dciytg.wav',
                'https://fonts.gstatic.com/s/kanit/v11/nKKU-Go6G5tXcr4yPRWnVaE.woff2',
                "https://res.cloudinary.com/keyzen/image/upload/v1644842353/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0006_ucc601.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842353/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0002_hyay3r.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842353/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0005_iayimt.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842353/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0003_ehfpp3.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842353/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0004_wiqy3w.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842353/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0010_jqwe7d.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842353/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0007_ml0iic.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842353/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0011_c9ndif.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842354/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0012_v753gl.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842354/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0009_miwqcy.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842354/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0008_kzvoat.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842354/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0015_yrumkm.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842354/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0013_z1a9up.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842354/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0014_rneaoh.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842354/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0017_jj069g.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842354/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0016_xcimag.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842354/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0019_xqo61b.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842354/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0018_bymjes.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842354/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0020_henbqv.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842355/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0021_lqamin.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842355/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0022_vanfu4.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842355/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0023_vrju7x.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842355/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0025_gyc27g.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842355/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0024_fko2fs.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842355/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0027_f5yvup.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842355/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0026_tbfc1g.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842355/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0028_bxmf9x.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842355/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0030_dioww4.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842355/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0029_jgyu8s.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842355/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0031_dbg07a.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842355/selb/C%C3%A1lculo/Problemas%20aplicados%20-%20JPG%20Est%C3%ADmulos-20220212T203054Z-001/Copia_de_Problemas_Aplicados_-_PPT_Est%C3%ADmulos.pptx_page-0032_klrv5l.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842356/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0002_psqphq.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842356/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0003_gv8ycp.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842356/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0004_fbaz7x.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842356/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0007_ozieeu.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842356/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0005_v8lhph.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842356/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0006_bcr7eh.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842356/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0008_hr8eut.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842356/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0009_pauc7v.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842356/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0012_qzew7q.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842356/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0010_ewezw2.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842356/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0013_nlwwig.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842356/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0011_kragxn.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842357/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0014_fzmo4v.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842357/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0015_ogp2bm.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842357/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0016_m7blqa.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842357/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0017_cd8be2.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1644842357/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0018_yh61ii.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_1_1_gzmoys.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_1_2_n4kx4u.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_1_3_molmqr.png" ,
                "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_1_4_snhvbq.png", 
                "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_2_1_wnxxkq.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_2_2_pi9xap.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_2_3_xq86c4.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_2_4_mv65zb.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_3_1_sgxf4j.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_3_2_cexdtp.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_3_3_ipn623.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_3_4_skmbb3.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666822/selb/wally/behavior/behavior_4_1_fyndfn.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666822/selb/wally/behavior/behavior_4_2_obu8qu.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666822/selb/wally/behavior/behavior_4_3_cnnpvq.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666822/selb/wally/behavior/behavior_4_4_tknz9j.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666822/selb/wally/behavior/behavior_5_1_d0veor.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666822/selb/wally/behavior/behavior_5_2_xzjkvx.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666823/selb/wally/behavior/behavior_5_3_zp5ymd.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666823/selb/wally/behavior/behavior_5_4_hk4a2v.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666823/selb/wally/behavior/behavior_6_1_mvziqj.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666823/selb/wally/behavior/behavior_6_2_zhtx0k.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666823/selb/wally/behavior/behavior_6_3_jybvz7.png",
                "https://res.cloudinary.com/keyzen/image/upload/v1665666823/selb/wally/behavior/behavior_6_4_tnvsr6.png" ,
                "https://res.cloudinary.com/keyzen/image/upload/v1658872135/selb/aces/1_wgsqrr.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872135/selb/aces/2_oc8z4j.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872135/selb/aces/3_wxddcu.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872135/selb/aces/4_zzkk3e.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872135/selb/aces/5_eal2hm.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872135/selb/aces/6_azfvbh.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872133/selb/aces/7_gjvjff.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872133/selb/aces/8_u20ot4.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872133/selb/aces/9_hy2ml9.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872133/selb/aces/10_y0roqm.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872133/selb/aces/11_lxvs93.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872133/selb/aces/12_irtjjg.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872134/selb/aces/13_wzbgte.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872134/selb/aces/14_lksrzi.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872134/selb/aces/15_hb6tl7.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872134/selb/aces/16_en9hrb.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872134/selb/aces/17_o34puq.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872134/selb/aces/18_rmqm05.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872134/selb/aces/19_xzbdcf.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872134/selb/aces/20_pudbob.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872134/selb/aces/21_na0hdv.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872134/selb/aces/22_sa4umg.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872134/selb/aces/23_xx588t.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872135/selb/aces/24_qpk0ty.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872135/selb/aces/25_quexdk.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1658872135/selb/aces/26_se3n31.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1665180605/selb/wally/situation_ijkiyw.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1665180605/selb/wally/situation_1_bjgcu5.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1665180605/selb/wally/situation_2_pih4ju.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1665180605/selb/wally/situation_3_oombkl.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1665180605/selb/wally/situation_4_zj29op.jpg",
                "https://res.cloudinary.com/keyzen/image/upload/v1665180605/selb/wally/situation_5_jlesas.jpg",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861111/fonolo/item_0_qrciqj.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861111/fonolo/item_1_k1jhs2.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861111/fonolo/item_2_y2lgrd.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861111/fonolo/item_3_hldule.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861979/fonolo/Ic_online-audio-converter.com_e5doen.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861111/fonolo/item_4_gjjvod.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_5_lldzan.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861112/fonolo/item_6_mtbekq.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861112/fonolo/item_7_osybyw.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861112/fonolo/item_8_yos4p2.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861112/fonolo/item_9_ehphqu.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861112/fonolo/item_10_wkjt57.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861114/fonolo/item_11_htldog.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_12_twm7ls.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_13_i7lyni.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_14_ssyvpp.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_15_crje9x.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_16_o373zz.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861115/fonolo/item_17_tph1tz.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_18_u4eou1.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_19_nrdy1s.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861114/fonolo/item_20_tnunrt.mp3",
                "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_21_d87pwg.mp3",
                "https://res.cloudinary.com/keyzen/image/upload/v1677206781/plus_bih1fy.png",






          





            ])
        })
    )
})


this.addEventListener("fetch", evt => {

    if (!navigator.onLine) {
        evt.respondWith(
            caches.match(evt.request).then((res => {
                if(res) {
                    return res
                }
                let requestUrl = evt.request.clone();
                fetch(requestUrl)
            }))
        )
    }

})

this.addEventListener('activate', function(event) {
    console.log('activando')
  })

