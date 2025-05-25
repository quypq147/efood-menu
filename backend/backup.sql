--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12 (Debian 15.12-1.pgdg120+1)
-- Dumped by pg_dump version 15.12 (Debian 15.12-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: quypq147
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO quypq147;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: quypq147
--

COMMENT ON SCHEMA public IS '';


--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: quypq147
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'CANCELLED'
);


ALTER TYPE public."OrderStatus" OWNER TO quypq147;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Category" OWNER TO quypq147;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: quypq147
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Category_id_seq" OWNER TO quypq147;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quypq147
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: Comment; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    content text NOT NULL,
    "userId" integer NOT NULL,
    "foodId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Comment" OWNER TO quypq147;

--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: quypq147
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Comment_id_seq" OWNER TO quypq147;

--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quypq147
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: Food; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public."Food" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    price double precision NOT NULL,
    image text NOT NULL,
    "categoryId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    quantity integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Food" OWNER TO quypq147;

--
-- Name: Food_id_seq; Type: SEQUENCE; Schema: public; Owner: quypq147
--

CREATE SEQUENCE public."Food_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Food_id_seq" OWNER TO quypq147;

--
-- Name: Food_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quypq147
--

ALTER SEQUENCE public."Food_id_seq" OWNED BY public."Food".id;


--
-- Name: Invoice; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public."Invoice" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "issuedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    total double precision NOT NULL,
    "customerName" text,
    "customerPhone" text,
    "paymentType" text,
    status text NOT NULL
);


ALTER TABLE public."Invoice" OWNER TO quypq147;

--
-- Name: Invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: quypq147
--

CREATE SEQUENCE public."Invoice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Invoice_id_seq" OWNER TO quypq147;

--
-- Name: Invoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quypq147
--

ALTER SEQUENCE public."Invoice_id_seq" OWNED BY public."Invoice".id;


--
-- Name: Order; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    "orderNumber" text NOT NULL,
    "userId" integer,
    total double precision NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "serverType" text
);


ALTER TABLE public."Order" OWNER TO quypq147;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public."OrderItem" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "foodId" integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    note text,
    price double precision NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO quypq147;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE; Schema: public; Owner: quypq147
--

CREATE SEQUENCE public."OrderItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."OrderItem_id_seq" OWNER TO quypq147;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quypq147
--

ALTER SEQUENCE public."OrderItem_id_seq" OWNED BY public."OrderItem".id;


--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: quypq147
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Order_id_seq" OWNER TO quypq147;

--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quypq147
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: Permission; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public."Permission" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Permission" OWNER TO quypq147;

--
-- Name: Permission_id_seq; Type: SEQUENCE; Schema: public; Owner: quypq147
--

CREATE SEQUENCE public."Permission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Permission_id_seq" OWNER TO quypq147;

--
-- Name: Permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quypq147
--

ALTER SEQUENCE public."Permission_id_seq" OWNED BY public."Permission".id;


--
-- Name: Review; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "foodId" integer NOT NULL,
    comment text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Review" OWNER TO quypq147;

--
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: quypq147
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Review_id_seq" OWNER TO quypq147;

--
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quypq147
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


--
-- Name: Role; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public."Role" OWNER TO quypq147;

--
-- Name: RolePermission; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public."RolePermission" (
    id integer NOT NULL,
    "roleId" integer NOT NULL,
    "permissionId" integer NOT NULL
);


ALTER TABLE public."RolePermission" OWNER TO quypq147;

--
-- Name: RolePermission_id_seq; Type: SEQUENCE; Schema: public; Owner: quypq147
--

CREATE SEQUENCE public."RolePermission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RolePermission_id_seq" OWNER TO quypq147;

--
-- Name: RolePermission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quypq147
--

ALTER SEQUENCE public."RolePermission_id_seq" OWNED BY public."RolePermission".id;


--
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: quypq147
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Role_id_seq" OWNER TO quypq147;

--
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quypq147
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "emailVerifyToken" text,
    "isEmailVerified" boolean DEFAULT false NOT NULL,
    "roleId" integer NOT NULL,
    "emailToken" text,
    address text,
    "birthDate" timestamp(3) without time zone,
    "resetToken" text,
    "resetTokenExp" timestamp(3) without time zone,
    fullname text NOT NULL,
    "phoneNumber" text,
    username text NOT NULL
);


ALTER TABLE public."User" OWNER TO quypq147;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: quypq147
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO quypq147;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quypq147
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO quypq147;

--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: Food id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Food" ALTER COLUMN id SET DEFAULT nextval('public."Food_id_seq"'::regclass);


--
-- Name: Invoice id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Invoice" ALTER COLUMN id SET DEFAULT nextval('public."Invoice_id_seq"'::regclass);


--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: OrderItem id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."OrderItem" ALTER COLUMN id SET DEFAULT nextval('public."OrderItem_id_seq"'::regclass);


--
-- Name: Permission id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Permission" ALTER COLUMN id SET DEFAULT nextval('public."Permission_id_seq"'::regclass);


--
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- Name: RolePermission id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."RolePermission" ALTER COLUMN id SET DEFAULT nextval('public."RolePermission_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."Category" (id, name) FROM stdin;
3	Súp
4	Nướng
5	Khai vị
6	Tráng miệng
1	Món nóng
2	Món lạnh
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."Comment" (id, content, "userId", "foodId", "createdAt") FROM stdin;
\.


--
-- Data for Name: Food; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."Food" (id, name, description, price, image, "categoryId", "createdAt", status, "updatedAt", quantity) FROM stdin;
10	Mì cay hải sản	Mì cay hải sản có nước mì cay nồng vừa ăn vừa hít hà, hòa quyện trong đó là vị đậm đà và ngọt tự nhiên từ hải sản.	45000	/uploads/e41bf595-983d-4f1f-868f-571d04915895.jpg	1	2025-05-17 15:12:27.688	t	2025-05-21 08:46:43.26	8
2	Kem Dâu	Vào những ngày thời tiết oi ả, nếu được thưởng thức món kem thơm ngon, mát lạnh quả là thích thú phải không nào!	10000	/uploads/49a867ed-d0de-446f-bafe-0834ec78b5a5.jpg	6	2025-05-15 00:19:01.19	t	2025-05-21 08:46:48.367	8
4	Mì Ý tôm sốt cải bó xôi	Cải bó xôi còn được gọi: rau chân vịt, rau bina ... là loại rau có rất nhiều dưỡng chất có lợi cho sức khỏe Với món mì Ý sốt cải bó xôi có một màu xanh rất tươi ngon đẹp mắt, kích thích vị giác của trẻ em & người lớn nữa	25000	/uploads/f3ebdb76-01a7-4c55-9272-24d6662f687c.png	1	2025-05-17 14:24:04.648	t	2025-05-21 08:47:28.275	7
\.


--
-- Data for Name: Invoice; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."Invoice" (id, "orderId", "issuedAt", total, "customerName", "customerPhone", "paymentType", status) FROM stdin;
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."Order" (id, "orderNumber", "userId", total, status, "createdAt", "updatedAt", "serverType") FROM stdin;
2	59219	\N	20000	COMPLETED	2025-05-17 07:44:57.748	2025-05-17 15:26:37.934	\N
3	8783	\N	100000	CANCELLED	2025-05-17 14:08:06.277	2025-05-17 15:27:26.297	\N
1	10512	\N	10000	PENDING	2025-05-16 08:12:24.838	2025-05-17 15:27:28.155	\N
4	47771	\N	80000	PENDING	2025-05-21 08:42:34.438	2025-05-21 08:42:34.438	\N
5	50461	\N	25000	PENDING	2025-05-21 08:46:36.243	2025-05-21 08:46:36.243	\N
6	12248	\N	45000	PENDING	2025-05-21 08:46:43.263	2025-05-21 08:46:43.263	\N
7	15702	\N	10000	PENDING	2025-05-21 08:46:48.373	2025-05-21 08:46:48.373	\N
8	63458	\N	25000	PENDING	2025-05-21 08:47:28.278	2025-05-21 08:47:28.278	\N
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."OrderItem" (id, "orderId", "foodId", quantity, "createdAt", "updatedAt", note, price) FROM stdin;
1	1	2	1	2025-05-16 08:12:24.838	2025-05-16 08:12:24.838		10000
2	2	2	2	2025-05-17 07:44:57.748	2025-05-17 07:44:57.748		10000
3	3	2	10	2025-05-17 14:08:06.277	2025-05-17 14:08:06.277	test	10000
4	4	4	1	2025-05-21 08:42:34.438	2025-05-21 08:42:34.438		25000
5	4	10	1	2025-05-21 08:42:34.438	2025-05-21 08:42:34.438		45000
6	4	2	1	2025-05-21 08:42:34.438	2025-05-21 08:42:34.438		10000
7	5	4	1	2025-05-21 08:46:36.243	2025-05-21 08:46:36.243		25000
8	6	10	1	2025-05-21 08:46:43.263	2025-05-21 08:46:43.263		45000
9	7	2	1	2025-05-21 08:46:48.373	2025-05-21 08:46:48.373		10000
10	8	4	1	2025-05-21 08:47:28.278	2025-05-21 08:47:28.278		25000
\.


--
-- Data for Name: Permission; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."Permission" (id, name) FROM stdin;
1	Đăng Kí Tài Khoản
4	Xóa món ăn khỏi Menu
2	Đăng Nhập Tài Khoản
5	Chọn món ăn trên Menu
3	Xóa Tài Khoản
6	Sửa món ăn trong Menu
7	Tạo Menu
9	Xem Thông Tin Đơn Đặt Hàng
11	Quản lý tài khoản
13	Thêm món ăn vào Menu
15	In hóa đơn
8	Chỉnh Sửa Tài Khoản
10	Cập nhật Menu
12	Thanh Toán
14	Xem Menu
16	Đánh Giá Món Ăn
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."Review" (id, "userId", "foodId", comment, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."Role" (id, name, description) FROM stdin;
1	Staff	\N
2	Customer	\N
3	Admin	\N
\.


--
-- Data for Name: RolePermission; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."RolePermission" (id, "roleId", "permissionId") FROM stdin;
1	3	1
2	3	2
3	3	3
4	3	11
5	3	8
6	3	7
7	3	14
8	3	9
9	3	10
10	3	13
11	3	6
12	3	4
13	3	5
14	3	12
15	3	15
16	3	16
17	1	1
18	1	2
19	1	3
20	1	11
21	1	8
22	1	7
23	1	14
24	1	9
25	1	10
26	1	13
27	1	6
28	1	4
29	1	15
30	2	1
31	2	2
32	2	8
33	2	14
34	2	9
35	2	5
36	2	12
37	2	16
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."User" (id, email, password, "createdAt", "updatedAt", "emailVerifyToken", "isEmailVerified", "roleId", "emailToken", address, "birthDate", "resetToken", "resetTokenExp", fullname, "phoneNumber", username) FROM stdin;
1	phanngocquy14072004@gmail.com	$2b$10$KQjM2IwxDxrHshQRG7u08.OvvTrFOoXQEAZCmR2LWjV7CGDZvxnAW	2025-04-15 17:47:51.957	2025-05-10 01:19:03.771	\N	t	2	\N	Hutech Khu E	2004-07-14 00:00:00	\N	\N	Phan Ngoc Quy	012345678	quypq147
8	phanngocquy1472004@gmail.com	$2b$10$KQjM2IwxDxrHshQRG7u08.OvvTrFOoXQEAZCmR2LWjV7CGDZvxnAW	2025-05-09 08:47:29.395	2025-05-10 01:19:25.59	\N	t	3	\N	\N	\N	\N	\N	Admin	\N	admin123
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
185e4b92-20d9-453f-9165-011dcfc8b336	b752de2f60f167c2a8d843873999e338dbb7a38a113a291004d46fb14f3e9515	2025-04-28 09:17:27.041315+00	20250412114126_init	\N	\N	2025-04-28 09:17:27.02362+00	1
6453247b-a495-4892-bf72-d47398ac6376	64c62f37ef4a74a0e8ed8f541aca77807fff55f9777aff056277af76997943c8	2025-05-16 08:11:57.029697+00	20250516081156_add_price_to_orderitem	\N	\N	2025-05-16 08:11:57.023534+00	1
9fe40bda-28ea-4242-ae6c-cd200e6077b4	3a8470507e92ab519c764a4c8449a871706d0c7cbe6d04729dc749b40c449d77	2025-04-28 09:17:27.061406+00	20250413090217_add_email_verification	\N	\N	2025-04-28 09:17:27.042494+00	1
bff43b81-4b04-434b-885d-1b20ac60a03e	6db53ab35f89447976e585c895609e37d39f217e25969b2207fc785790ba7b26	2025-04-28 09:17:27.067382+00	20250413194537_add_email_token_to_user	\N	\N	2025-04-28 09:17:27.062689+00	1
f18cbca9-3013-4440-9766-000d1e3aeeb1	2ce6ca11b9ca5645ebeaca12929f8d3475f16677c0b37939040919837d360e24	2025-04-28 09:17:27.073374+00	20250413205001_update_user_fields	\N	\N	2025-04-28 09:17:27.069099+00	1
21955e6b-fb09-467e-814a-e4b17bd59586	39347e341593c7c7cbb86d42fbd71cfdffc3020621d32d8ddf38ac457013d7ed	2025-05-18 14:05:06.00595+00	20250518140505_add_invoice	\N	\N	2025-05-18 14:05:05.985568+00	1
6a57572c-6e7d-42a6-b8d1-314580906c9e	4fa633f4cebd6bc1c20e432614e36c8af2b35004b28b16e66f7beb4e9c939e4d	2025-04-28 09:17:27.078906+00	20250413205156_add_reset_token	\N	\N	2025-04-28 09:17:27.07458+00	1
41538a68-e705-4db1-88b7-2bd8da3977c0	c07b1ea261ee0c02958e0c53bd2392e5ccb60e26bddcf63db5aae3d5d7a99d14	2025-04-28 09:17:44.684273+00	20250428091744_add_orders	\N	\N	2025-04-28 09:17:44.667759+00	1
e91ce13d-fda0-4f28-a6f5-f371696ebaea	94772e7d55e699d285366795f87ba2f3eb9b28994049b77abc5771cbb607af23	2025-04-29 02:35:56.083001+00	20250429023555_add_stock_to_food	\N	\N	2025-04-29 02:35:56.071785+00	1
e80ebc00-633b-4834-86a7-04a3d5be1744	4e664c1ce224c8362431478b1e0c6d2561fdbd53c895f7e2f80769a833a7d365	2025-05-10 17:24:53.58678+00	20250510172453_add_reviews_and_comments	\N	\N	2025-05-10 17:24:53.557397+00	1
bc41ea7f-aeee-466a-a984-862e8fca9383	a8fa2ade9e16bec777e4aef17c20b41d87d7f3128a5e3f4d26e253540e5c5ea6	2025-05-12 02:56:05.919188+00	20250512025605_make_category_name_unique	\N	\N	2025-05-12 02:56:05.90236+00	1
d126b267-0d5e-4bd6-a50e-1c96520f63e0	a276bc5da0df280e0618e16a69aecdb67850afada9749b61e2e49cb0c0398343	2025-05-12 02:57:32.138205+00	20250512025731_add_quantity_to_food	\N	\N	2025-05-12 02:57:32.130373+00	1
e7318c67-930c-4d60-bfb1-eaf3d9f5f335	f587fbb4de65559c6c52ffafa86a2e5839a0cfe7f2cd62dfe10540c83716119e	2025-05-16 01:28:35.917207+00	20250516012835_add_note_to_orderitem	\N	\N	2025-05-16 01:28:35.910364+00	1
e7cf26bc-5166-4c0b-b770-c070d90415b4	dd3364ecc9516d526ccb21376dd3841e77e8b76e5a67ef6672d89af7b90cc892	2025-05-16 03:36:43.150627+00	20250516033642_add_note_to_orderitem	\N	\N	2025-05-16 03:36:43.138594+00	1
49b7277e-78f5-4f4b-bd12-2cf20a450cdd	907e3f3fa89b379f4bf49388b746e521ec151dffbcb56c23e44d83c6015714c2	2025-05-16 07:17:53.952587+00	20250516071753_allow_order_without_user	\N	\N	2025-05-16 07:17:53.942179+00	1
\.


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."Category_id_seq"', 8, true);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 1, false);


--
-- Name: Food_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."Food_id_seq"', 10, true);


--
-- Name: Invoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."Invoice_id_seq"', 1, false);


--
-- Name: OrderItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."OrderItem_id_seq"', 10, true);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."Order_id_seq"', 8, true);


--
-- Name: Permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."Permission_id_seq"', 16, true);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."Review_id_seq"', 1, false);


--
-- Name: RolePermission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."RolePermission_id_seq"', 37, true);


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."Role_id_seq"', 3, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."User_id_seq"', 8, true);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Food Food_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Food"
    ADD CONSTRAINT "Food_pkey" PRIMARY KEY (id);


--
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Permission Permission_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Permission"
    ADD CONSTRAINT "Permission_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: RolePermission RolePermission_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."RolePermission"
    ADD CONSTRAINT "RolePermission_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: quypq147
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- Name: Food_name_key; Type: INDEX; Schema: public; Owner: quypq147
--

CREATE UNIQUE INDEX "Food_name_key" ON public."Food" USING btree (name);


--
-- Name: Invoice_orderId_key; Type: INDEX; Schema: public; Owner: quypq147
--

CREATE UNIQUE INDEX "Invoice_orderId_key" ON public."Invoice" USING btree ("orderId");


--
-- Name: Order_orderNumber_key; Type: INDEX; Schema: public; Owner: quypq147
--

CREATE UNIQUE INDEX "Order_orderNumber_key" ON public."Order" USING btree ("orderNumber");


--
-- Name: Permission_name_key; Type: INDEX; Schema: public; Owner: quypq147
--

CREATE UNIQUE INDEX "Permission_name_key" ON public."Permission" USING btree (name);


--
-- Name: RolePermission_roleId_permissionId_key; Type: INDEX; Schema: public; Owner: quypq147
--

CREATE UNIQUE INDEX "RolePermission_roleId_permissionId_key" ON public."RolePermission" USING btree ("roleId", "permissionId");


--
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: quypq147
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: quypq147
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: quypq147
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Comment Comment_foodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES public."Food"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Food Food_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Food"
    ADD CONSTRAINT "Food_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Invoice Invoice_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_foodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES public."Food"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Review Review_foodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES public."Food"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RolePermission RolePermission_permissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."RolePermission"
    ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES public."Permission"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RolePermission RolePermission_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."RolePermission"
    ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: quypq147
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

