PGDMP  
    .                |            gym    17.2    17.2 X    ]           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            ^           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            _           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            `           1262    16525    gym    DATABASE     v   CREATE DATABASE gym WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE gym;
                     postgres    false            �            1259    16527 
   asistencia    TABLE       CREATE TABLE public.asistencia (
    id_asistencia bigint NOT NULL,
    created_at timestamp(6) without time zone,
    fecha_hora timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    id_clase_servicio bigint,
    id_cliente bigint
);
    DROP TABLE public.asistencia;
       public         heap r       postgres    false            �            1259    16526    asistencia_id_asistencia_seq    SEQUENCE     �   CREATE SEQUENCE public.asistencia_id_asistencia_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.asistencia_id_asistencia_seq;
       public               postgres    false    218            a           0    0    asistencia_id_asistencia_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.asistencia_id_asistencia_seq OWNED BY public.asistencia.id_asistencia;
          public               postgres    false    217            �            1259    16534    clase_servicio    TABLE     M  CREATE TABLE public.clase_servicio (
    id_clase_servicio bigint NOT NULL,
    clasificacion character varying(255),
    condiciones_uso character varying(255),
    created_at timestamp(6) without time zone,
    descripcion character varying(255),
    nombre character varying(255),
    updated_at timestamp(6) without time zone
);
 "   DROP TABLE public.clase_servicio;
       public         heap r       postgres    false            �            1259    16533 $   clase_servicio_id_clase_servicio_seq    SEQUENCE     �   CREATE SEQUENCE public.clase_servicio_id_clase_servicio_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.clase_servicio_id_clase_servicio_seq;
       public               postgres    false    220            b           0    0 $   clase_servicio_id_clase_servicio_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.clase_servicio_id_clase_servicio_seq OWNED BY public.clase_servicio.id_clase_servicio;
          public               postgres    false    219            �            1259    16543    cliente    TABLE     �  CREATE TABLE public.cliente (
    id_cliente bigint NOT NULL,
    cedula character varying(255),
    correo_electronico character varying(255),
    created_at timestamp(6) without time zone,
    edad integer,
    estatura double precision,
    nombre character varying(255),
    telefono character varying(255),
    updated_at timestamp(6) without time zone,
    responsable_id bigint
);
    DROP TABLE public.cliente;
       public         heap r       postgres    false            �            1259    16552    cliente_frecuente    TABLE       CREATE TABLE public.cliente_frecuente (
    id_cliente_frecuente bigint NOT NULL,
    cantidad_ingresos integer,
    created_at timestamp(6) without time zone,
    fecha_ultimo_ingreso date,
    updated_at timestamp(6) without time zone,
    id_cliente bigint
);
 %   DROP TABLE public.cliente_frecuente;
       public         heap r       postgres    false            �            1259    16551 *   cliente_frecuente_id_cliente_frecuente_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_frecuente_id_cliente_frecuente_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public.cliente_frecuente_id_cliente_frecuente_seq;
       public               postgres    false    224            c           0    0 *   cliente_frecuente_id_cliente_frecuente_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public.cliente_frecuente_id_cliente_frecuente_seq OWNED BY public.cliente_frecuente.id_cliente_frecuente;
          public               postgres    false    223            �            1259    16542    cliente_id_cliente_seq    SEQUENCE        CREATE SEQUENCE public.cliente_id_cliente_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_cliente_seq;
       public               postgres    false    222            d           0    0    cliente_id_cliente_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_cliente_seq OWNED BY public.cliente.id_cliente;
          public               postgres    false    221            �            1259    16559 	   empleados    TABLE     �  CREATE TABLE public.empleados (
    id_empleado bigint NOT NULL,
    cedula character varying(255),
    correo_electronico character varying(255),
    created_at timestamp(6) without time zone,
    horario_laboral character varying(255),
    nombre character varying(255),
    telefono character varying(255),
    tipo_empleado character varying(255),
    updated_at timestamp(6) without time zone,
    CONSTRAINT empleados_tipo_empleado_check CHECK (((tipo_empleado)::text = ANY ((ARRAY['ADMINISTRATIVO'::character varying, 'INSTRUCTOR'::character varying, 'LIMPIEZA'::character varying, 'MANTENIMIENTO'::character varying, 'ATENCION_AL_CLIENTE'::character varying])::text[])))
);
    DROP TABLE public.empleados;
       public         heap r       postgres    false            �            1259    16558    empleados_id_empleado_seq    SEQUENCE     �   CREATE SEQUENCE public.empleados_id_empleado_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.empleados_id_empleado_seq;
       public               postgres    false    226            e           0    0    empleados_id_empleado_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.empleados_id_empleado_seq OWNED BY public.empleados.id_empleado;
          public               postgres    false    225            �            1259    16569    equipo_maquina    TABLE     �  CREATE TABLE public.equipo_maquina (
    id_equipo_maquina bigint NOT NULL,
    created_at timestamp(6) without time zone,
    descripcion character varying(255),
    estado character varying(255),
    nombre character varying(255),
    updated_at timestamp(6) without time zone,
    CONSTRAINT equipo_maquina_estado_check CHECK (((estado)::text = ANY ((ARRAY['OPERATIVA'::character varying, 'INHABILITADA'::character varying])::text[])))
);
 "   DROP TABLE public.equipo_maquina;
       public         heap r       postgres    false            �            1259    16568 $   equipo_maquina_id_equipo_maquina_seq    SEQUENCE     �   CREATE SEQUENCE public.equipo_maquina_id_equipo_maquina_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.equipo_maquina_id_equipo_maquina_seq;
       public               postgres    false    228            f           0    0 $   equipo_maquina_id_equipo_maquina_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.equipo_maquina_id_equipo_maquina_seq OWNED BY public.equipo_maquina.id_equipo_maquina;
          public               postgres    false    227            �            1259    16579    horario_clase_servicio    TABLE     ?  CREATE TABLE public.horario_clase_servicio (
    id_horario bigint NOT NULL,
    created_at timestamp(6) without time zone,
    dia_semana character varying(255),
    hora_fin character varying(255),
    hora_inicio character varying(255),
    updated_at timestamp(6) without time zone,
    id_clase_servicio bigint
);
 *   DROP TABLE public.horario_clase_servicio;
       public         heap r       postgres    false            �            1259    16578 %   horario_clase_servicio_id_horario_seq    SEQUENCE     �   CREATE SEQUENCE public.horario_clase_servicio_id_horario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.horario_clase_servicio_id_horario_seq;
       public               postgres    false    230            g           0    0 %   horario_clase_servicio_id_horario_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.horario_clase_servicio_id_horario_seq OWNED BY public.horario_clase_servicio.id_horario;
          public               postgres    false    229            �            1259    16588 	   promocion    TABLE       CREATE TABLE public.promocion (
    id_promocion bigint NOT NULL,
    created_at timestamp(6) without time zone,
    descripcion character varying(255),
    fecha_fin date,
    fecha_inicio date,
    nombre character varying(255),
    updated_at timestamp(6) without time zone
);
    DROP TABLE public.promocion;
       public         heap r       postgres    false            �            1259    16587    promocion_id_promocion_seq    SEQUENCE     �   CREATE SEQUENCE public.promocion_id_promocion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.promocion_id_promocion_seq;
       public               postgres    false    232            h           0    0    promocion_id_promocion_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.promocion_id_promocion_seq OWNED BY public.promocion.id_promocion;
          public               postgres    false    231            �            1259    16597    requisitos_acceso    TABLE       CREATE TABLE public.requisitos_acceso (
    id_requisito bigint NOT NULL,
    created_at timestamp(6) without time zone,
    tipo_requisito character varying(255),
    updated_at timestamp(6) without time zone,
    valor_requisito character varying(255),
    id_clase_servicio bigint
);
 %   DROP TABLE public.requisitos_acceso;
       public         heap r       postgres    false            �            1259    16596 "   requisitos_acceso_id_requisito_seq    SEQUENCE     �   CREATE SEQUENCE public.requisitos_acceso_id_requisito_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.requisitos_acceso_id_requisito_seq;
       public               postgres    false    234            i           0    0 "   requisitos_acceso_id_requisito_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.requisitos_acceso_id_requisito_seq OWNED BY public.requisitos_acceso.id_requisito;
          public               postgres    false    233            �            1259    16606    responsables    TABLE     A  CREATE TABLE public.responsables (
    id_responsable bigint NOT NULL,
    cedula character varying(255),
    correo_electronico character varying(255),
    created_at timestamp(6) without time zone,
    nombre character varying(255),
    telefono character varying(255),
    updated_at timestamp(6) without time zone
);
     DROP TABLE public.responsables;
       public         heap r       postgres    false            �            1259    16605    responsables_id_responsable_seq    SEQUENCE     �   CREATE SEQUENCE public.responsables_id_responsable_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.responsables_id_responsable_seq;
       public               postgres    false    236            j           0    0    responsables_id_responsable_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.responsables_id_responsable_seq OWNED BY public.responsables.id_responsable;
          public               postgres    false    235            �            1259    16615    usuarios    TABLE     �   CREATE TABLE public.usuarios (
    id bigint NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(255) NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap r       postgres    false            �            1259    16614    usuarios_id_seq    SEQUENCE     x   CREATE SEQUENCE public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public               postgres    false    238            k           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public               postgres    false    237            �           2604    16530    asistencia id_asistencia    DEFAULT     �   ALTER TABLE ONLY public.asistencia ALTER COLUMN id_asistencia SET DEFAULT nextval('public.asistencia_id_asistencia_seq'::regclass);
 G   ALTER TABLE public.asistencia ALTER COLUMN id_asistencia DROP DEFAULT;
       public               postgres    false    217    218    218            �           2604    16537     clase_servicio id_clase_servicio    DEFAULT     �   ALTER TABLE ONLY public.clase_servicio ALTER COLUMN id_clase_servicio SET DEFAULT nextval('public.clase_servicio_id_clase_servicio_seq'::regclass);
 O   ALTER TABLE public.clase_servicio ALTER COLUMN id_clase_servicio DROP DEFAULT;
       public               postgres    false    219    220    220            �           2604    16546    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_cliente_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public               postgres    false    221    222    222            �           2604    16555 &   cliente_frecuente id_cliente_frecuente    DEFAULT     �   ALTER TABLE ONLY public.cliente_frecuente ALTER COLUMN id_cliente_frecuente SET DEFAULT nextval('public.cliente_frecuente_id_cliente_frecuente_seq'::regclass);
 U   ALTER TABLE public.cliente_frecuente ALTER COLUMN id_cliente_frecuente DROP DEFAULT;
       public               postgres    false    223    224    224            �           2604    16562    empleados id_empleado    DEFAULT     ~   ALTER TABLE ONLY public.empleados ALTER COLUMN id_empleado SET DEFAULT nextval('public.empleados_id_empleado_seq'::regclass);
 D   ALTER TABLE public.empleados ALTER COLUMN id_empleado DROP DEFAULT;
       public               postgres    false    226    225    226            �           2604    16572     equipo_maquina id_equipo_maquina    DEFAULT     �   ALTER TABLE ONLY public.equipo_maquina ALTER COLUMN id_equipo_maquina SET DEFAULT nextval('public.equipo_maquina_id_equipo_maquina_seq'::regclass);
 O   ALTER TABLE public.equipo_maquina ALTER COLUMN id_equipo_maquina DROP DEFAULT;
       public               postgres    false    228    227    228            �           2604    16582 !   horario_clase_servicio id_horario    DEFAULT     �   ALTER TABLE ONLY public.horario_clase_servicio ALTER COLUMN id_horario SET DEFAULT nextval('public.horario_clase_servicio_id_horario_seq'::regclass);
 P   ALTER TABLE public.horario_clase_servicio ALTER COLUMN id_horario DROP DEFAULT;
       public               postgres    false    230    229    230            �           2604    16591    promocion id_promocion    DEFAULT     �   ALTER TABLE ONLY public.promocion ALTER COLUMN id_promocion SET DEFAULT nextval('public.promocion_id_promocion_seq'::regclass);
 E   ALTER TABLE public.promocion ALTER COLUMN id_promocion DROP DEFAULT;
       public               postgres    false    231    232    232            �           2604    16600    requisitos_acceso id_requisito    DEFAULT     �   ALTER TABLE ONLY public.requisitos_acceso ALTER COLUMN id_requisito SET DEFAULT nextval('public.requisitos_acceso_id_requisito_seq'::regclass);
 M   ALTER TABLE public.requisitos_acceso ALTER COLUMN id_requisito DROP DEFAULT;
       public               postgres    false    234    233    234            �           2604    16609    responsables id_responsable    DEFAULT     �   ALTER TABLE ONLY public.responsables ALTER COLUMN id_responsable SET DEFAULT nextval('public.responsables_id_responsable_seq'::regclass);
 J   ALTER TABLE public.responsables ALTER COLUMN id_responsable DROP DEFAULT;
       public               postgres    false    235    236    236            �           2604    16618    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    237    238    238            F          0    16527 
   asistencia 
   TABLE DATA           v   COPY public.asistencia (id_asistencia, created_at, fecha_hora, updated_at, id_clase_servicio, id_cliente) FROM stdin;
    public               postgres    false    218   �u       H          0    16534    clase_servicio 
   TABLE DATA           �   COPY public.clase_servicio (id_clase_servicio, clasificacion, condiciones_uso, created_at, descripcion, nombre, updated_at) FROM stdin;
    public               postgres    false    220   v       J          0    16543    cliente 
   TABLE DATA           �   COPY public.cliente (id_cliente, cedula, correo_electronico, created_at, edad, estatura, nombre, telefono, updated_at, responsable_id) FROM stdin;
    public               postgres    false    222   2v       L          0    16552    cliente_frecuente 
   TABLE DATA           �   COPY public.cliente_frecuente (id_cliente_frecuente, cantidad_ingresos, created_at, fecha_ultimo_ingreso, updated_at, id_cliente) FROM stdin;
    public               postgres    false    224   �w       N          0    16559 	   empleados 
   TABLE DATA           �   COPY public.empleados (id_empleado, cedula, correo_electronico, created_at, horario_laboral, nombre, telefono, tipo_empleado, updated_at) FROM stdin;
    public               postgres    false    226   �w       P          0    16569    equipo_maquina 
   TABLE DATA           p   COPY public.equipo_maquina (id_equipo_maquina, created_at, descripcion, estado, nombre, updated_at) FROM stdin;
    public               postgres    false    228   �w       R          0    16579    horario_clase_servicio 
   TABLE DATA           �   COPY public.horario_clase_servicio (id_horario, created_at, dia_semana, hora_fin, hora_inicio, updated_at, id_clase_servicio) FROM stdin;
    public               postgres    false    230   �y       T          0    16588 	   promocion 
   TABLE DATA           w   COPY public.promocion (id_promocion, created_at, descripcion, fecha_fin, fecha_inicio, nombre, updated_at) FROM stdin;
    public               postgres    false    232   �y       V          0    16597    requisitos_acceso 
   TABLE DATA           �   COPY public.requisitos_acceso (id_requisito, created_at, tipo_requisito, updated_at, valor_requisito, id_clase_servicio) FROM stdin;
    public               postgres    false    234   	z       X          0    16606    responsables 
   TABLE DATA           |   COPY public.responsables (id_responsable, cedula, correo_electronico, created_at, nombre, telefono, updated_at) FROM stdin;
    public               postgres    false    236   &z       Z          0    16615    usuarios 
   TABLE DATA           :   COPY public.usuarios (id, password, username) FROM stdin;
    public               postgres    false    238   �{       l           0    0    asistencia_id_asistencia_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.asistencia_id_asistencia_seq', 1, false);
          public               postgres    false    217            m           0    0 $   clase_servicio_id_clase_servicio_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.clase_servicio_id_clase_servicio_seq', 1, false);
          public               postgres    false    219            n           0    0 *   cliente_frecuente_id_cliente_frecuente_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public.cliente_frecuente_id_cliente_frecuente_seq', 1, false);
          public               postgres    false    223            o           0    0    cliente_id_cliente_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cliente_id_cliente_seq', 10, true);
          public               postgres    false    221            p           0    0    empleados_id_empleado_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.empleados_id_empleado_seq', 1, false);
          public               postgres    false    225            q           0    0 $   equipo_maquina_id_equipo_maquina_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.equipo_maquina_id_equipo_maquina_seq', 12, true);
          public               postgres    false    227            r           0    0 %   horario_clase_servicio_id_horario_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.horario_clase_servicio_id_horario_seq', 1, false);
          public               postgres    false    229            s           0    0    promocion_id_promocion_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.promocion_id_promocion_seq', 1, false);
          public               postgres    false    231            t           0    0 "   requisitos_acceso_id_requisito_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.requisitos_acceso_id_requisito_seq', 1, false);
          public               postgres    false    233            u           0    0    responsables_id_responsable_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.responsables_id_responsable_seq', 12, true);
          public               postgres    false    235            v           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 4, true);
          public               postgres    false    237            �           2606    16532    asistencia asistencia_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.asistencia
    ADD CONSTRAINT asistencia_pkey PRIMARY KEY (id_asistencia);
 D   ALTER TABLE ONLY public.asistencia DROP CONSTRAINT asistencia_pkey;
       public                 postgres    false    218            �           2606    16541 "   clase_servicio clase_servicio_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.clase_servicio
    ADD CONSTRAINT clase_servicio_pkey PRIMARY KEY (id_clase_servicio);
 L   ALTER TABLE ONLY public.clase_servicio DROP CONSTRAINT clase_servicio_pkey;
       public                 postgres    false    220            �           2606    16557 (   cliente_frecuente cliente_frecuente_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.cliente_frecuente
    ADD CONSTRAINT cliente_frecuente_pkey PRIMARY KEY (id_cliente_frecuente);
 R   ALTER TABLE ONLY public.cliente_frecuente DROP CONSTRAINT cliente_frecuente_pkey;
       public                 postgres    false    224            �           2606    16550    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public                 postgres    false    222            �           2606    16567    empleados empleados_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pkey PRIMARY KEY (id_empleado);
 B   ALTER TABLE ONLY public.empleados DROP CONSTRAINT empleados_pkey;
       public                 postgres    false    226            �           2606    16577 "   equipo_maquina equipo_maquina_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.equipo_maquina
    ADD CONSTRAINT equipo_maquina_pkey PRIMARY KEY (id_equipo_maquina);
 L   ALTER TABLE ONLY public.equipo_maquina DROP CONSTRAINT equipo_maquina_pkey;
       public                 postgres    false    228            �           2606    16586 2   horario_clase_servicio horario_clase_servicio_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.horario_clase_servicio
    ADD CONSTRAINT horario_clase_servicio_pkey PRIMARY KEY (id_horario);
 \   ALTER TABLE ONLY public.horario_clase_servicio DROP CONSTRAINT horario_clase_servicio_pkey;
       public                 postgres    false    230            �           2606    16595    promocion promocion_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.promocion
    ADD CONSTRAINT promocion_pkey PRIMARY KEY (id_promocion);
 B   ALTER TABLE ONLY public.promocion DROP CONSTRAINT promocion_pkey;
       public                 postgres    false    232            �           2606    16604 (   requisitos_acceso requisitos_acceso_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.requisitos_acceso
    ADD CONSTRAINT requisitos_acceso_pkey PRIMARY KEY (id_requisito);
 R   ALTER TABLE ONLY public.requisitos_acceso DROP CONSTRAINT requisitos_acceso_pkey;
       public                 postgres    false    234            �           2606    16613    responsables responsables_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.responsables
    ADD CONSTRAINT responsables_pkey PRIMARY KEY (id_responsable);
 H   ALTER TABLE ONLY public.responsables DROP CONSTRAINT responsables_pkey;
       public                 postgres    false    236            �           2606    16624 %   usuarios uk_m2dvbwfge291euvmk6vkkocao 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT uk_m2dvbwfge291euvmk6vkkocao UNIQUE (username);
 O   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT uk_m2dvbwfge291euvmk6vkkocao;
       public                 postgres    false    238            �           2606    16622    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public                 postgres    false    238            �           2606    16645 2   horario_clase_servicio fk42ltdy950vtma253h8u63ap0c    FK CONSTRAINT     �   ALTER TABLE ONLY public.horario_clase_servicio
    ADD CONSTRAINT fk42ltdy950vtma253h8u63ap0c FOREIGN KEY (id_clase_servicio) REFERENCES public.clase_servicio(id_clase_servicio);
 \   ALTER TABLE ONLY public.horario_clase_servicio DROP CONSTRAINT fk42ltdy950vtma253h8u63ap0c;
       public               postgres    false    220    230    4761            �           2606    16650 -   requisitos_acceso fk489mphrddx3siqbkn1oxxvsat    FK CONSTRAINT     �   ALTER TABLE ONLY public.requisitos_acceso
    ADD CONSTRAINT fk489mphrddx3siqbkn1oxxvsat FOREIGN KEY (id_clase_servicio) REFERENCES public.clase_servicio(id_clase_servicio);
 W   ALTER TABLE ONLY public.requisitos_acceso DROP CONSTRAINT fk489mphrddx3siqbkn1oxxvsat;
       public               postgres    false    4761    220    234            �           2606    16635 #   cliente fk9cx1u0x7u8tex06wjprteo6p6    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT fk9cx1u0x7u8tex06wjprteo6p6 FOREIGN KEY (responsable_id) REFERENCES public.responsables(id_responsable);
 M   ALTER TABLE ONLY public.cliente DROP CONSTRAINT fk9cx1u0x7u8tex06wjprteo6p6;
       public               postgres    false    236    4777    222            �           2606    16630 &   asistencia fkfxmdiopgiprfbrk3b49m177w7    FK CONSTRAINT     �   ALTER TABLE ONLY public.asistencia
    ADD CONSTRAINT fkfxmdiopgiprfbrk3b49m177w7 FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente);
 P   ALTER TABLE ONLY public.asistencia DROP CONSTRAINT fkfxmdiopgiprfbrk3b49m177w7;
       public               postgres    false    4763    218    222            �           2606    16640 -   cliente_frecuente fkiqjdsakmab39lanmgakbygwdi    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_frecuente
    ADD CONSTRAINT fkiqjdsakmab39lanmgakbygwdi FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente);
 W   ALTER TABLE ONLY public.cliente_frecuente DROP CONSTRAINT fkiqjdsakmab39lanmgakbygwdi;
       public               postgres    false    224    222    4763            �           2606    16625 &   asistencia fkqswm4g107p92mahhi1qedpi6y    FK CONSTRAINT     �   ALTER TABLE ONLY public.asistencia
    ADD CONSTRAINT fkqswm4g107p92mahhi1qedpi6y FOREIGN KEY (id_clase_servicio) REFERENCES public.clase_servicio(id_clase_servicio);
 P   ALTER TABLE ONLY public.asistencia DROP CONSTRAINT fkqswm4g107p92mahhi1qedpi6y;
       public               postgres    false    218    4761    220            F      x������ � �      H      x������ � �      J   [  x���An�0E��Sp���1�dU��VU"Uɶ���
p�$�ަ�*G�b�!b�8�{�{�h�e�乵���xنs��Rw�ie:Щ6�4j�(��f�
�]f��,%-l|�>Y"Y�d�Q9��]p��1�c薆�)��>Lކ�,D2⨜���)�9�|l��B�m}Y����d�y��Dr�(���(`
/K�	�X���9ޖ�����'[��;�,F2㨞��T!M����:���/^��v��x'z�c��Hj�3'J�:(1|��$m�������O6�=^�{�Z$/���*������*�����i�x�����;���I��w�W���B�p��      L      x������ � �      N      x������ � �      P   �  x���K��0������Ԓ�1;���&�ĕU62"�\�<g���9��v�~|�o	J( �@ �(f$&$��^�Ϫ�$���6�0�27"��۾%��s�]\j[��+��e�Q��,�h����2ǵ.��gP�<׍Q��?ui�_��!ޏ�|�0$������kc,~�꧐"H_��U���M2-Y�+�s�A>J���n��6��e���Je�),*S�jU������Ͻ���(���oL�f�����͈��'l�K��[���!D"/��'�3yU�]I�^΅����P��)�_-F�g�u��ŞTո��s����X��vCA��B���^kq]�7˪}��tV�_�S��>au�<����������n�-8�C!���,z�җ��E�e\
@|x�$4fl�挓08��R�{F/+�G?��:f$$����������y����}��Y8��>����}�!�~]-      R      x������ � �      T      x������ � �      V      x������ � �      X   �  x����N�0�ׇ���iK[`Vc\���ѭ��T� ����Ʒ�0+��J�I�����z�A��y����@oCkY���u�z�v��=H.�JC���|�k���Ɔ�d���DQ4ѤZ�2s�(`�v����+���}�gzC z(�h2-̹��چβ�۹qU�2�惈*�.�d���bU���c��B�Wzr��t�P�Q�d\�0g9��?�}>�0�a�2|���Eh��(�h�I�\�`�
�?�p�7����w��:L�!�(�h�-g��*%t�'�P?����X�y�q��DEM�3Y�k^H������������ñ}��6P�Fq�L��W���A΅1e����w"�+�����޺��w�g� ���2�ܨB��[�#��|�"{`Y���A�      Z   �   x�M�Mo�0 ��3�;p�J���(�21*��]J)o����O?�h��9����g��B�^�^kn��|�@&@���n@��2{1zb�<�]T	'$RA�K�-�����~�Yl7^�V�~q��Au�H��]'�7ca�(����Z=]Ap��Ԫ֛� �\ex�9L֢= ����-��j�����qI���A.��8�m�_�ԭ��X7����|� � �N@     