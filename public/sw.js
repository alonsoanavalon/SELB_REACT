let cacheData = "app-v4";
this.addEventListener("install", evt => {
    console.log("installing")
    caches.delete('app-v1')
    caches.delete('app-v2')
    caches.delete("app-v3")
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
                '/students',
                '/menu.png',
                '/instruments',
                '/items',
                '/tejaslee',
                '/calculo',
                '/excel',
                '/sdq',
                'https://cdnjs.cloudflare.com/ajax/libs/hamburgers/1.1.3/hamburgers.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
                '/images/man.png',
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
                "https://res.cloudinary.com/keyzen/image/upload/v1644842357/selb/C%C3%A1lculo/Identificaci%C3%B3n%20de%20N%C3%BAmeros%20-%20JPG%20Est%C3%ADmulos-20220212T203015Z-001/Identificaci%C3%B3n_de_N%C3%BAmeros_-_PPT_Est%C3%ADmulos.pptx_page-0018_yh61ii.jpg"





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

