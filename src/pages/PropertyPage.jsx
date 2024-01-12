import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  useDisclosure,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";
import moment from "jalali-moment";
import "./property.css";
import { useParams } from "react-router-dom";
import BASE_URL from "../utils/BASE_URL";
import {Helmet} from "react-helmet";
import Landing from "../components/Landing";
import PropertyImages from "../components/PropertyImages";
function PropertyPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [propertyData, setPropertyData] = useState();
  const [hour, setHour] = useState();
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({
      top: "0",
      left: "0",
    });
  }, []);
  useEffect(() => {
    fetch(`${BASE_URL}/propertyes/one/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPropertyData([data]);
        setHour(data.createdAt);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <>
      <div className="main-property">
        {propertyData ? propertyData.map((pro) => (
          <>
               <Helmet>
         <meta charSet="utf-8" />
         <title>{pro?.title}</title>
         <meta name={pro?.title}  content={pro?.description} />
            </Helmet>
            <div className="property-body" key={pro._id}>
              <div>
                <PropertyImages images={pro?.images}/>
              </div>
              <div className="property-body-item">
                <p>تاریخ آگهی</p>
                <time>
                  {moment(hour, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD")}
                </time>
              </div>
              {pro.category ? (
                <div className="property-body-item">
                  <p>نوع ملک</p>
                  <p>{pro.category}</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="property-footer max-sm:p-1">
              {pro.area ? (
                <div className="property-body-item">
                  <p>متراژ</p>
                  <p>{pro.area}</p>
                </div>
              ) : (
                ""
              )}
              {pro.year ? (
                <div className="property-body-item">
                  <p>سال ساخت</p>
                  <p>{pro.year}</p>
                </div>
              ) : (
                ""
              )}
              {pro.bedroom ? (
                <div className="property-body-item">
                  <p>تعداد اتاق</p>
                  <p>{pro.bedroom}</p>
                </div>
              ) : (
                ""
              )}
              {pro.price !== 'undefined' && pro.price ? (
                <div className="property-body-item">
                  <p>قیمت</p>
                  <p>{pro.price}</p>
                </div>
              ) : (
                ""
              )}
              {pro.rent ? (
                <div className="property-body-item">
                  <p>ودیعه</p>
                  <p>{pro.rent}</p>
                </div>
              ) : (
                ""
              )}
               {pro.perMonth ? (
                <div className="property-body-item">
                  <p>اجاره ماهانه</p>
                  <p>{pro.perMonth}</p>
                </div>
              ) : (
                ""
              )}
              {pro.description ? (
                <>
                  <h3 className="property-footer-title font-bold">توضیحات</h3>
                  <div className="desc">
                    <p>{pro.description}</p>
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="acc">
                <Accordion>
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title="راهنما خرید"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    deleniti omnis aut minus labore obcaecati porro, vitae
                    similique quasi, beatae, excepturi provident quibusdam!
                    Saepe nam sapiente minima vero consequuntur error corporis
                    voluptatem dolore voluptatum quam iste alias consectetur
                    soluta ipsum labore explicabo, doloribus in totam dolor
                    asperiores? Hic ad, beatae alias voluptatem delectus unde
                    cum laboriosam, accusantium, minus quas quis!
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="modal">
                <Button onPress={onOpen} color="primary" variant="flat">
                  شماره تماس
                </Button>
                <Modal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  placement="top-center"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-3 mt-3 text-blue-600 text-center">
                          شماره تماس
                        </ModalHeader>
                        <ModalBody>
                          <p>
                            شماره تماس : <span>+{pro.phone}</span>
                          </p>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="flat"
                            onPress={onClose}
                          >
                            بستن
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </>
        )) :
         <Landing/>
        }
      </div>
    </>
  );
}

export default PropertyPage;
