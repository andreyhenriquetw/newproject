"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "./ui/button"
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  LayoutDashboardIcon,
  LockIcon,
} from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import SignInDialog from "./sign-in-dialog"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  const [openAdmin, setOpenAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const router = useRouter()

  function handleAdminAccess() {
    if (adminPassword === "kn") {
      document.cookie = "admin-auth=true; path=/"
      setAdminPassword("")
      setOpenAdmin(false)
      router.push("/dashboard")
    } else {
      alert("Senha incorreta")
    }
  }

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      {/* INÍCIO / AGENDAMENTOS / DASHBOARD */}
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost" asChild>
          <Link href="/bookings">
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </Button>

        {/* DASHBOARD COM SENHA */}
        <Dialog open={openAdmin} onOpenChange={setOpenAdmin}>
          <DialogTrigger asChild>
            <Button className="justify-start gap-2" variant="ghost">
              <LayoutDashboardIcon size={18} />
              Dashboard
            </Button>
          </DialogTrigger>

          <DialogContent className="top-[30%] w-[90%] max-w-sm translate-y-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <LockIcon size={18} />
                <h2 className="font-bold">Acesso restrito</h2>
              </div>

              <input
                type="password"
                placeholder="Digite a senha"
                className="w-full rounded-md border px-3 py-2 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />

              <Button className="w-full" onClick={handleAdminAccess}>
                Entrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* SERVIÇOS */}
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {data?.user && (
        <div className="flex flex-col gap-2 py-5">
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet
