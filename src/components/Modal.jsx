import React from "react";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Link} from "@nextui-org/react";
import { useState } from "react";


export default function ModalFrom() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const register = (e) => {
      // if(username === '' && password === '' && email === ''){
      //   alert('تمام فیلد ها اجباری هستند')
      // }
     e.preventDefault()
     let newUser = {username,email,password}
     fetch('http://localhost:4000/auth/register',{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newUser)
     }).then(res => res.json()).then(data => console.log(data)).catch(err=> console.log(err))
     
    }
  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat">ثبت نام</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-3 mt-3 text-blue-600 text-center">ثبت نام</ModalHeader>
                <form method="post" onSubmit={register}>
              <ModalBody>

              <Input
                  autoFocus
                //   endContent={
                //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                //   }
                  label="نام کاربری"
                  placeholder="نام خود را وارد کنید"
                  variant="bordered"
                  color="primary"
                  size="lg"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                //   endContent={
                //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                //   }
                  label="ایمیل"
                  placeholder="ایمیل خود را وارد کنید"
                  variant="bordered"
                  size="lg"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                //   endContent={
                //   }
                  label="رمز عبور"
                  placeholder="رمز عبور خود را وارد کنید"
                  type="password"
                  variant="bordered"
                  size="lg"
                  onChange={(e) => setPassword(e.target.value)}
                  />
                <div className="flex py-2 px-1 justify-center">
                  <Link color="primary" href="#" size="sm">
                    از قبل اکانت ساخته اید ؟ وارد شوید
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  بستن
                </Button>
                <button  type="submit">
                  ثبت نام
                </button>
              </ModalFooter>
                  </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
