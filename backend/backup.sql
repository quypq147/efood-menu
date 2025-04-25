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
-- Name: Food; Type: TABLE; Schema: public; Owner: quypq147
--

CREATE TABLE public."Food" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    price double precision NOT NULL,
    image text NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "categoryId" integer NOT NULL
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
    fullname text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "phoneNumber" text,
    address text,
    "birthDate" timestamp(3) without time zone,
    "roleId" integer NOT NULL,
    "isEmailVerified" boolean DEFAULT false NOT NULL,
    "emailVerifyToken" text,
    "resetToken" text,
    "resetTokenExp" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "emailToken" text
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
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Food id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Food" ALTER COLUMN id SET DEFAULT nextval('public."Food_id_seq"'::regclass);


--
-- Name: Permission id; Type: DEFAULT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Permission" ALTER COLUMN id SET DEFAULT nextval('public."Permission_id_seq"'::regclass);


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
\.


--
-- Data for Name: Food; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."Food" (id, name, description, price, image, status, "createdAt", "updatedAt", "categoryId") FROM stdin;
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
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."Role" (id, name, description) FROM stdin;
2	Customer	\N
3	Admin	\N
1	Staff	\N
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
38	1	5
39	2	3
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: quypq147
--

COPY public."User" (id, fullname, username, email, password, "phoneNumber", address, "birthDate", "roleId", "isEmailVerified", "emailVerifyToken", "resetToken", "resetTokenExp", "createdAt", "updatedAt", "emailToken") FROM stdin;
2	admin	admin123	admin123@admin123.com	$2b$10$vbc73zxX7kUWor8kv82anutpWyXiFV3E225R2ezPCofVCkIWPU85K	\N	\N	\N	3	t	\N	\N	\N	2025-04-16 16:20:03.181	2025-04-19 12:17:47.004	\N
5	Phan Ngoc Test	quypq146	phanngocquy1472003@gmail.com	$2b$10$dNPnxme3r10qgZkwH7Z6D.hDuzBknjRpcnq4xnwY81dHzlx13fx9i	(386) 684-6822	Hutech Khu E	2004-07-21 00:00:00	2	t	\N	\N	\N	2025-04-19 12:26:53.497	2025-04-19 12:29:56.758	\N
1	Phan Ngoc Quy	quypq147	phanngocquy14072004@gmail.com	$2b$10$QbxX5Vvn3liSnjxuMVbZXOL7mB.KBV9VwS1EhLYRXN4YNbT7rWmmi	012345678	Địa chỉ	2004-07-14 00:00:00	3	t	\N	\N	\N	2025-04-15 17:47:51.957	2025-04-24 06:29:52.868	\N
\.


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."Category_id_seq"', 1, false);


--
-- Name: Food_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."Food_id_seq"', 1, false);


--
-- Name: Permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: quypq147
--

SELECT pg_catalog.setval('public."Permission_id_seq"', 16, true);


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

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Food Food_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Food"
    ADD CONSTRAINT "Food_pkey" PRIMARY KEY (id);


--
-- Name: Permission Permission_pkey; Type: CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Permission"
    ADD CONSTRAINT "Permission_pkey" PRIMARY KEY (id);


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
-- Name: Food Food_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quypq147
--

ALTER TABLE ONLY public."Food"
    ADD CONSTRAINT "Food_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


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
-- PostgreSQL database dump complete
--

