PGDMP         #                |            optiservice_prueba    15.4    15.4 O    ^           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            _           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            `           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            a           1262    17183    optiservice_prueba    DATABASE     �   CREATE DATABASE optiservice_prueba WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Ecuador.1252';
 "   DROP DATABASE optiservice_prueba;
                postgres    false            b           0    0    optiservice_prueba    DATABASE PROPERTIES     I   ALTER DATABASE optiservice_prueba SET "TimeZone" TO 'America/Guayaquil';
                     postgres    false            �            1259    17184    calificaciones    TABLE     9  CREATE TABLE public.calificaciones (
    id_calificacion integer NOT NULL,
    id_publicacion integer NOT NULL,
    puntuacion integer NOT NULL,
    comentario character varying(500),
    fecha_calificacion date NOT NULL,
    id_usuario_calificador integer NOT NULL,
    id_usuario_calificado integer NOT NULL
);
 "   DROP TABLE public.calificaciones;
       public         heap    postgres    false            �            1259    17189     calificacion_id_calificacion_seq    SEQUENCE     �   CREATE SEQUENCE public.calificacion_id_calificacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.calificacion_id_calificacion_seq;
       public          postgres    false    214            c           0    0     calificacion_id_calificacion_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.calificacion_id_calificacion_seq OWNED BY public.calificaciones.id_calificacion;
          public          postgres    false    215            �            1259    17190 
   categorias    TABLE     u   CREATE TABLE public.categorias (
    id_categoria integer NOT NULL,
    categoria character varying(255) NOT NULL
);
    DROP TABLE public.categorias;
       public         heap    postgres    false            �            1259    17193    categorias_id_categoria_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.categorias_id_categoria_seq;
       public          postgres    false    216            d           0    0    categorias_id_categoria_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.categorias_id_categoria_seq OWNED BY public.categorias.id_categoria;
          public          postgres    false    217            �            1259    17303    estados_postulacion    TABLE     �   CREATE TABLE public.estados_postulacion (
    id_estado_postulacion integer NOT NULL,
    nombre_estado_postulacion character varying(200) NOT NULL
);
 '   DROP TABLE public.estados_postulacion;
       public         heap    postgres    false            �            1259    17302 !   estados_postulacion_id_estado_seq    SEQUENCE     �   CREATE SEQUENCE public.estados_postulacion_id_estado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.estados_postulacion_id_estado_seq;
       public          postgres    false    227            e           0    0 !   estados_postulacion_id_estado_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public.estados_postulacion_id_estado_seq OWNED BY public.estados_postulacion.id_estado_postulacion;
          public          postgres    false    226            �            1259    17315    estados_publicacion    TABLE     �   CREATE TABLE public.estados_publicacion (
    id_estado_publicacion integer NOT NULL,
    nombre_estado_publicacion character varying(200) NOT NULL
);
 '   DROP TABLE public.estados_publicacion;
       public         heap    postgres    false            �            1259    17314 -   estados_publicacion_id_estado_publicacion_seq    SEQUENCE     �   CREATE SEQUENCE public.estados_publicacion_id_estado_publicacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 D   DROP SEQUENCE public.estados_publicacion_id_estado_publicacion_seq;
       public          postgres    false    229            f           0    0 -   estados_publicacion_id_estado_publicacion_seq    SEQUENCE OWNED BY        ALTER SEQUENCE public.estados_publicacion_id_estado_publicacion_seq OWNED BY public.estados_publicacion.id_estado_publicacion;
          public          postgres    false    228            �            1259    17194    pagos    TABLE     e   CREATE TABLE public.pagos (
    id_pagos integer NOT NULL,
    monto integer,
    fecha_pago date
);
    DROP TABLE public.pagos;
       public         heap    postgres    false            �            1259    17197    postulaciones    TABLE     H  CREATE TABLE public.postulaciones (
    id_publicacion integer NOT NULL,
    id_estado_postulacion integer NOT NULL,
    id_empleado integer NOT NULL,
    fecha_postulacion date NOT NULL,
    id_postulacion integer NOT NULL,
    calificado boolean DEFAULT false NOT NULL,
    calificacion_done boolean DEFAULT false NOT NULL
);
 !   DROP TABLE public.postulaciones;
       public         heap    postgres    false            �            1259    17447     postulaciones_id_postulacion_seq    SEQUENCE     �   CREATE SEQUENCE public.postulaciones_id_postulacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.postulaciones_id_postulacion_seq;
       public          postgres    false    219            g           0    0     postulaciones_id_postulacion_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.postulaciones_id_postulacion_seq OWNED BY public.postulaciones.id_postulacion;
          public          postgres    false    231            �            1259    17200    publicaciones    TABLE       CREATE TABLE public.publicaciones (
    id_publicacion integer NOT NULL,
    titulo character varying(500) NOT NULL,
    descripcion character varying(500) NOT NULL,
    pago character varying(500) NOT NULL,
    fecha_publicacion date NOT NULL,
    id_categoria integer NOT NULL,
    id_estado_publicacion integer NOT NULL,
    provincia character varying(500) NOT NULL,
    ciudad character varying(500) NOT NULL,
    id_empleador integer NOT NULL,
    fecha_modificacion date NOT NULL,
    calificado boolean DEFAULT false NOT NULL
);
 !   DROP TABLE public.publicaciones;
       public         heap    postgres    false            �            1259    17205    publicacion_id_publicacion_seq    SEQUENCE     �   CREATE SEQUENCE public.publicacion_id_publicacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.publicacion_id_publicacion_seq;
       public          postgres    false    220            h           0    0    publicacion_id_publicacion_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.publicacion_id_publicacion_seq OWNED BY public.publicaciones.id_publicacion;
          public          postgres    false    221            �            1259    17206    roles    TABLE     b   CREATE TABLE public.roles (
    id_rol integer NOT NULL,
    nombre_rol character varying(100)
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    17209    roles_id_rol_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.roles_id_rol_seq;
       public          postgres    false    222            i           0    0    roles_id_rol_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.roles_id_rol_seq OWNED BY public.roles.id_rol;
          public          postgres    false    223            �            1259    17210    usuarios    TABLE     ?  CREATE TABLE public.usuarios (
    id_usuario character(10) NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(300) NOT NULL,
    fecha_nacimiento date NOT NULL,
    fecha_registro date NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    17215    usuarios_roles    TABLE     �   CREATE TABLE public.usuarios_roles (
    id_usuario character(10) NOT NULL,
    id_rol integer NOT NULL,
    id_usuario_rol integer NOT NULL
);
 "   DROP TABLE public.usuarios_roles;
       public         heap    postgres    false            �            1259    17398 !   usuarios_roles_id_usuario_rol_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_roles_id_usuario_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.usuarios_roles_id_usuario_rol_seq;
       public          postgres    false    225            j           0    0 !   usuarios_roles_id_usuario_rol_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.usuarios_roles_id_usuario_rol_seq OWNED BY public.usuarios_roles.id_usuario_rol;
          public          postgres    false    230            �           2604    17219    calificaciones id_calificacion    DEFAULT     �   ALTER TABLE ONLY public.calificaciones ALTER COLUMN id_calificacion SET DEFAULT nextval('public.calificacion_id_calificacion_seq'::regclass);
 M   ALTER TABLE public.calificaciones ALTER COLUMN id_calificacion DROP DEFAULT;
       public          postgres    false    215    214            �           2604    17220    categorias id_categoria    DEFAULT     �   ALTER TABLE ONLY public.categorias ALTER COLUMN id_categoria SET DEFAULT nextval('public.categorias_id_categoria_seq'::regclass);
 F   ALTER TABLE public.categorias ALTER COLUMN id_categoria DROP DEFAULT;
       public          postgres    false    217    216            �           2604    17306 )   estados_postulacion id_estado_postulacion    DEFAULT     �   ALTER TABLE ONLY public.estados_postulacion ALTER COLUMN id_estado_postulacion SET DEFAULT nextval('public.estados_postulacion_id_estado_seq'::regclass);
 X   ALTER TABLE public.estados_postulacion ALTER COLUMN id_estado_postulacion DROP DEFAULT;
       public          postgres    false    227    226    227            �           2604    17318 )   estados_publicacion id_estado_publicacion    DEFAULT     �   ALTER TABLE ONLY public.estados_publicacion ALTER COLUMN id_estado_publicacion SET DEFAULT nextval('public.estados_publicacion_id_estado_publicacion_seq'::regclass);
 X   ALTER TABLE public.estados_publicacion ALTER COLUMN id_estado_publicacion DROP DEFAULT;
       public          postgres    false    228    229    229            �           2604    17448    postulaciones id_postulacion    DEFAULT     �   ALTER TABLE ONLY public.postulaciones ALTER COLUMN id_postulacion SET DEFAULT nextval('public.postulaciones_id_postulacion_seq'::regclass);
 K   ALTER TABLE public.postulaciones ALTER COLUMN id_postulacion DROP DEFAULT;
       public          postgres    false    231    219            �           2604    17221    publicaciones id_publicacion    DEFAULT     �   ALTER TABLE ONLY public.publicaciones ALTER COLUMN id_publicacion SET DEFAULT nextval('public.publicacion_id_publicacion_seq'::regclass);
 K   ALTER TABLE public.publicaciones ALTER COLUMN id_publicacion DROP DEFAULT;
       public          postgres    false    221    220            �           2604    17222    roles id_rol    DEFAULT     l   ALTER TABLE ONLY public.roles ALTER COLUMN id_rol SET DEFAULT nextval('public.roles_id_rol_seq'::regclass);
 ;   ALTER TABLE public.roles ALTER COLUMN id_rol DROP DEFAULT;
       public          postgres    false    223    222            �           2604    17399    usuarios_roles id_usuario_rol    DEFAULT     �   ALTER TABLE ONLY public.usuarios_roles ALTER COLUMN id_usuario_rol SET DEFAULT nextval('public.usuarios_roles_id_usuario_rol_seq'::regclass);
 L   ALTER TABLE public.usuarios_roles ALTER COLUMN id_usuario_rol DROP DEFAULT;
       public          postgres    false    230    225            J          0    17184    calificaciones 
   TABLE DATA           �   COPY public.calificaciones (id_calificacion, id_publicacion, puntuacion, comentario, fecha_calificacion, id_usuario_calificador, id_usuario_calificado) FROM stdin;
    public          postgres    false    214   Ig       L          0    17190 
   categorias 
   TABLE DATA           =   COPY public.categorias (id_categoria, categoria) FROM stdin;
    public          postgres    false    216   fg       W          0    17303    estados_postulacion 
   TABLE DATA           _   COPY public.estados_postulacion (id_estado_postulacion, nombre_estado_postulacion) FROM stdin;
    public          postgres    false    227   h       Y          0    17315    estados_publicacion 
   TABLE DATA           _   COPY public.estados_publicacion (id_estado_publicacion, nombre_estado_publicacion) FROM stdin;
    public          postgres    false    229   Eh       N          0    17194    pagos 
   TABLE DATA           <   COPY public.pagos (id_pagos, monto, fecha_pago) FROM stdin;
    public          postgres    false    218   �h       O          0    17197    postulaciones 
   TABLE DATA           �   COPY public.postulaciones (id_publicacion, id_estado_postulacion, id_empleado, fecha_postulacion, id_postulacion, calificado, calificacion_done) FROM stdin;
    public          postgres    false    219   �h       P          0    17200    publicaciones 
   TABLE DATA           �   COPY public.publicaciones (id_publicacion, titulo, descripcion, pago, fecha_publicacion, id_categoria, id_estado_publicacion, provincia, ciudad, id_empleador, fecha_modificacion, calificado) FROM stdin;
    public          postgres    false    220   �h       R          0    17206    roles 
   TABLE DATA           3   COPY public.roles (id_rol, nombre_rol) FROM stdin;
    public          postgres    false    222   �h       T          0    17210    usuarios 
   TABLE DATA           s   COPY public.usuarios (id_usuario, nombre, apellido, email, password, fecha_nacimiento, fecha_registro) FROM stdin;
    public          postgres    false    224   i       U          0    17215    usuarios_roles 
   TABLE DATA           L   COPY public.usuarios_roles (id_usuario, id_rol, id_usuario_rol) FROM stdin;
    public          postgres    false    225   .i       k           0    0     calificacion_id_calificacion_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.calificacion_id_calificacion_seq', 1, false);
          public          postgres    false    215            l           0    0    categorias_id_categoria_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.categorias_id_categoria_seq', 8, true);
          public          postgres    false    217            m           0    0 !   estados_postulacion_id_estado_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.estados_postulacion_id_estado_seq', 3, true);
          public          postgres    false    226            n           0    0 -   estados_publicacion_id_estado_publicacion_seq    SEQUENCE SET     [   SELECT pg_catalog.setval('public.estados_publicacion_id_estado_publicacion_seq', 3, true);
          public          postgres    false    228            o           0    0     postulaciones_id_postulacion_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.postulaciones_id_postulacion_seq', 1, false);
          public          postgres    false    231            p           0    0    publicacion_id_publicacion_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.publicacion_id_publicacion_seq', 1, false);
          public          postgres    false    221            q           0    0    roles_id_rol_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.roles_id_rol_seq', 3, true);
          public          postgres    false    223            r           0    0 !   usuarios_roles_id_usuario_rol_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.usuarios_roles_id_usuario_rol_seq', 1, false);
          public          postgres    false    230            �           2606    17225     calificaciones calificacion_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.calificaciones
    ADD CONSTRAINT calificacion_pkey PRIMARY KEY (id_calificacion);
 J   ALTER TABLE ONLY public.calificaciones DROP CONSTRAINT calificacion_pkey;
       public            postgres    false    214            �           2606    17227    categorias categorias_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id_categoria);
 D   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pkey;
       public            postgres    false    216            �           2606    17431    usuarios email_unique 
   CONSTRAINT     Q   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT email_unique UNIQUE (email);
 ?   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT email_unique;
       public            postgres    false    224            �           2606    17308 ,   estados_postulacion estados_postulacion_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public.estados_postulacion
    ADD CONSTRAINT estados_postulacion_pkey PRIMARY KEY (id_estado_postulacion);
 V   ALTER TABLE ONLY public.estados_postulacion DROP CONSTRAINT estados_postulacion_pkey;
       public            postgres    false    227            �           2606    17320 ,   estados_publicacion estados_publicacion_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public.estados_publicacion
    ADD CONSTRAINT estados_publicacion_pkey PRIMARY KEY (id_estado_publicacion);
 V   ALTER TABLE ONLY public.estados_publicacion DROP CONSTRAINT estados_publicacion_pkey;
       public            postgres    false    229            �           2606    17229    pagos pagos_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_pkey PRIMARY KEY (id_pagos);
 :   ALTER TABLE ONLY public.pagos DROP CONSTRAINT pagos_pkey;
       public            postgres    false    218            �           2606    17453     postulaciones postulaciones_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.postulaciones
    ADD CONSTRAINT postulaciones_pkey PRIMARY KEY (id_postulacion);
 J   ALTER TABLE ONLY public.postulaciones DROP CONSTRAINT postulaciones_pkey;
       public            postgres    false    219            �           2606    17233    publicaciones publicacion_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicacion_pkey PRIMARY KEY (id_publicacion);
 H   ALTER TABLE ONLY public.publicaciones DROP CONSTRAINT publicacion_pkey;
       public            postgres    false    220            �           2606    17235    roles roles_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_rol);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    222            �           2606    17237    usuarios usuario_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);
 ?   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuario_pkey;
       public            postgres    false    224            �           2606    17404 "   usuarios_roles usuarios_roles_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuarios_roles
    ADD CONSTRAINT usuarios_roles_pkey PRIMARY KEY (id_usuario_rol);
 L   ALTER TABLE ONLY public.usuarios_roles DROP CONSTRAINT usuarios_roles_pkey;
       public            postgres    false    225            �           2606    17240 .   calificaciones fk_calificaciones_publicaciones    FK CONSTRAINT     �   ALTER TABLE ONLY public.calificaciones
    ADD CONSTRAINT fk_calificaciones_publicaciones FOREIGN KEY (id_publicacion) REFERENCES public.publicaciones(id_publicacion);
 X   ALTER TABLE ONLY public.calificaciones DROP CONSTRAINT fk_calificaciones_publicaciones;
       public          postgres    false    3236    214    220            �           2606    17309 2   postulaciones fk_postulaciones_estados_postulacion    FK CONSTRAINT     �   ALTER TABLE ONLY public.postulaciones
    ADD CONSTRAINT fk_postulaciones_estados_postulacion FOREIGN KEY (id_estado_postulacion) REFERENCES public.estados_postulacion(id_estado_postulacion);
 \   ALTER TABLE ONLY public.postulaciones DROP CONSTRAINT fk_postulaciones_estados_postulacion;
       public          postgres    false    219    3246    227            �           2606    17415 ,   postulaciones fk_postulaciones_publicaciones    FK CONSTRAINT     �   ALTER TABLE ONLY public.postulaciones
    ADD CONSTRAINT fk_postulaciones_publicaciones FOREIGN KEY (id_publicacion) REFERENCES public.publicaciones(id_publicacion) NOT VALID;
 V   ALTER TABLE ONLY public.postulaciones DROP CONSTRAINT fk_postulaciones_publicaciones;
       public          postgres    false    219    3236    220            �           2606    17410 -   postulaciones fk_postulaciones_usuarios_roles    FK CONSTRAINT     �   ALTER TABLE ONLY public.postulaciones
    ADD CONSTRAINT fk_postulaciones_usuarios_roles FOREIGN KEY (id_empleado) REFERENCES public.usuarios_roles(id_usuario_rol) NOT VALID;
 W   ALTER TABLE ONLY public.postulaciones DROP CONSTRAINT fk_postulaciones_usuarios_roles;
       public          postgres    false    219    3244    225            �           2606    17250 )   publicaciones fk_publicaciones_categorias    FK CONSTRAINT     �   ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT fk_publicaciones_categorias FOREIGN KEY (id_categoria) REFERENCES public.categorias(id_categoria);
 S   ALTER TABLE ONLY public.publicaciones DROP CONSTRAINT fk_publicaciones_categorias;
       public          postgres    false    3230    220    216            �           2606    17321 2   publicaciones fk_publicaciones_estados_publicacion    FK CONSTRAINT     �   ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT fk_publicaciones_estados_publicacion FOREIGN KEY (id_estado_publicacion) REFERENCES public.estados_publicacion(id_estado_publicacion);
 \   ALTER TABLE ONLY public.publicaciones DROP CONSTRAINT fk_publicaciones_estados_publicacion;
       public          postgres    false    220    3248    229            �           2606    17405 -   publicaciones fk_publicaciones_usuarios_roles    FK CONSTRAINT     �   ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT fk_publicaciones_usuarios_roles FOREIGN KEY (id_empleador) REFERENCES public.usuarios_roles(id_usuario_rol) NOT VALID;
 W   ALTER TABLE ONLY public.publicaciones DROP CONSTRAINT fk_publicaciones_usuarios_roles;
       public          postgres    false    225    3244    220            �           2606    17425 2   calificaciones fk_usuario_calificado_usuario_roles    FK CONSTRAINT     �   ALTER TABLE ONLY public.calificaciones
    ADD CONSTRAINT fk_usuario_calificado_usuario_roles FOREIGN KEY (id_usuario_calificado) REFERENCES public.usuarios_roles(id_usuario_rol) NOT VALID;
 \   ALTER TABLE ONLY public.calificaciones DROP CONSTRAINT fk_usuario_calificado_usuario_roles;
       public          postgres    false    225    3244    214            �           2606    17420 4   calificaciones fk_usuario_calificador_usuarios_roles    FK CONSTRAINT     �   ALTER TABLE ONLY public.calificaciones
    ADD CONSTRAINT fk_usuario_calificador_usuarios_roles FOREIGN KEY (id_usuario_calificador) REFERENCES public.usuarios_roles(id_usuario_rol) NOT VALID;
 ^   ALTER TABLE ONLY public.calificaciones DROP CONSTRAINT fk_usuario_calificador_usuarios_roles;
       public          postgres    false    214    3244    225            �           2606    17270 )   usuarios_roles usuarios_roles_id_rol_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuarios_roles
    ADD CONSTRAINT usuarios_roles_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES public.roles(id_rol);
 S   ALTER TABLE ONLY public.usuarios_roles DROP CONSTRAINT usuarios_roles_id_rol_fkey;
       public          postgres    false    225    3238    222            �           2606    17275 -   usuarios_roles usuarios_roles_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuarios_roles
    ADD CONSTRAINT usuarios_roles_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);
 W   ALTER TABLE ONLY public.usuarios_roles DROP CONSTRAINT usuarios_roles_id_usuario_fkey;
       public          postgres    false    225    224    3242            J      x������ � �      L   �   x�E�=
1��S������`傖6!%���ɤ�PVa/fd������p1��+�3�R��0dI���\}�ѽ\WP�@Z�}�-������O��pG5j]Ϧd�iL�&��N���0��Q`��l_�Erٻ3?�S�"~~�<)      W   -   x�3�H�K�L�+I�2�tLN-(IL��2�JM�H��c���� ��      Y   ,   x�3�tL.�,K�2�tN-*JLI�2�t�Sp-.H-J����� ��	�      N      x������ � �      O      x������ � �      P      x������ � �      R   )   x�3�tL����,.)JL�/�2�t�-�I���l�=... F��      T      x������ � �      U      x������ � �     