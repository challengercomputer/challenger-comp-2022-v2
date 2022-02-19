import React, { Component } from 'react';
import {connect} from "react-redux";
import { Row, Col, Container, 
    // Button, 
Card, Modal, Table} from "react-bootstrap";
import Toolbar from "@material-ui/core/Toolbar";
import { motion } from "framer-motion";
import CpuCase from '../../assets/challenger-cpu.png';
import { GiEmptyChessboard, GiPlatform, GiComputerFan } from "react-icons/gi";
import { VscCircuitBoard } from "react-icons/vsc";
import { CgSmartphoneRam } from "react-icons/cg";
import { RiRadio2Line } from "react-icons/ri";
import { BsPlug } from "react-icons/bs";
import { BiCabinet, BiRupee } from "react-icons/bi";
import { MdSdStorage } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { ShoppingCart } from "react-feather";
import {addCustomPc} from "../../store/actions/storeFront";
import axios from "axios";
import MultiCarousel from "react-multi-carousel";
import { withAlert } from 'react-alert';
import {ScaleLoader} from "react-spinners";
import "react-multi-carousel/lib/styles.css";
import './customizeYourself.css'; 
import { isLogin } from '../authentication/authUtilities';
import Config from "../../store/Config/index.jsx";
import {Helmet} from "react-helmet";

const pageTransition = {
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

class customizeYourself extends Component {
    slideChange = React.createRef(); 
    categorySlide = React.createRef();
    state = {
        loading:true,
        saved:'',
        modalShow:false,
        allCategory:[],
        productType:[],
        productModal:[],
        list:{},
        slideNo:0,
        matcherData:[],
        platform:'',
        CPU:'',
        ram:'',
        motherboard:'',
        GPU:'',   
        SMPS:'',  
        cases:'',
        caseImage:'',
        cooler:'',
        storage1:'',
        storage2:'',
        categoryActive:'',
        selectedStorage:'hdd',
        ramQuantity:1,
        selectedRamQuantity:1,
        slideLoading:false,
        added:false,
        moreInfoModal:false,
        statusCompleted:false,
        gpuSkip:false,
        coolerSkip:false,
        series:null
    }
    modalData;
    postData = [
        {productID: "", productCategory: "cpu"},
        {productID: "", productCategory: "ram"},
        {productID: "", productCategory: "motherboard"},
        {productID: "", productCategory: "smps"},
        {productID: "", productCategory: "gpu"},
        {productID: "", productCategory: "storage1"},
        {productID: "", productCategory: "storage2"},
        {productID: "", productCategory: "cases"},
        {productID: "", productCategory: "cooler"}
    ];
    price = {
        cpuPrice : 0,
        ramPrice : 0,
        motherboardPrice : 0,
        gpuPrice : 0,
        smpsPrice : 0,
        casePrice : 0,
        coolerPrice : 0,
        storage1Price : 0,
        storage2Price : 0,
    }
    customPcData={
        customPcImage:'',
        customPcItemsID:[],
        qty:1,
        totalPrice: 0
    };
    responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      responsiveCategory = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
          slidesToSlide:5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide:4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide:3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          slidesToSlide:2
        }
      };
        
    // getting initial category and specs
    componentDidMount(){
        window.scrollTo(0, 0)
        axios.get(`/productSpecification/category`)
        .then(res => {
            this.setState({allCategory:res.data.allCategory})
            // this.setState({categoryActive:productType}); 
            this.setState({loading:false});
        })
    }

    // after carousel category clicked getting specific details and modals
    handleProductType = (productType, category, name, skip) => {
        this.setState({categoryActive:productType});  
        if(name === 'gpu'){
            this.setState({GPU:skip});
            this.price.gpuPrice = 0;
            this.handleSmps();
            this.slideChange.current.next();
        }
        if(name === 'cooler'){
            this.setState({cooler:skip});
            this.price.coolerPrice = 0;
            this.handleStorage1();
            this.selectStorage1();
            this.slideChange.current.next();
            return;
        }    // (null, null,'storage2', 'SKIPPED')
        if(name === 'storage1'){
            this.setState({storage1:skip});
            this.price.storage1Price = 0;
            this.handleStorage2();
            this.selectStorage1();
            this.slideChange.current.next();
            return;
        }
        if(name === 'storage2'){
            this.setState({storage2:skip});
            this.selectStorage1();
            // this.setState({slideNo:4})
            this.price.storage2Price = 0;
            this.setState({statusCompleted:true})
            // this.slideChange.current.next();
        }
        if(category === 'ram'){
            this.setState({selectedRamQuantity:name})
            axios.post(`/product?limit=1000&page=1&category=${category}`, {
                "buildYourPcFilter":productType
            })
            .then(res => {
                this.setState({productModal:res.data.products})
            })
         }
         if(category === 'motherboard'){
            axios.post(`/product?limit=1000&page=1&category=${category}`, {
                "buildYourPcFilter":productType,
                "subcategory":[this.state.platform],
                "motherboardMatcher":this.state.matcherData
            })
            .then(res => {
                this.setState({productModal:res.data.products})
            })
         }
        
        else {
            axios.post(`/product?limit=1000&page=1&category=${category}`, {
                "buildYourPcFilter":productType
            })
            .then(res => {
                console.log(res.data.products, 'res.data.products');
                this.setState({productModal:res.data.products})
            })
        }
    }
    // after selecting changing names and slides.
       
    handleSelect = (category, variant, quantity) => {
       switch(category){
            case 'Platform':
               this.setState({slideLoading:true});
               this.setState({slideNo:0})
               this.setState({platform:variant})
               this.setState({saved:'',added:false,statusCompleted:false,ramQuantity:'',CPU:'', ram:'',motherboard:'',GPU:'', SMPS:'',cases:'',caseImage:'', cooler:'',  storage1:'',  storage2:''})
               this.slideChange.current.next();
               this.handleCpu(variant);
            break;

            case 'CPU':
                console.log(variant, 'variant')
                if(variant.noSkip){
                    variant.noSkip.map(skip => {
                        if(skip === 'cooler'){
                            this.setState({coolerSkip: true})
                        } else {
                            this.setState({gpuSkip: true})
                        }
                    })
                }
                this.setState({slideLoading:true});
                this.setState({slideNo:1})
                this.setState({CPU:variant.productName})
                this.postData.map(post => {
                    if(post.productCategory === 'cpu'){
                        return post.productID = variant._id
                    }
                })
                this.price.cpuPrice = variant.finalPrice;
                axios.get(`/product/${variant._id}`)
                .then(res => {
                    this.setState({matcherData: res.data.product.motherboardMatcher});
                    this.slideChange.current.next();
                    this.handleMotherboard();
                })
                .catch(error => {
                    alert('something went wrong')
                })  
                break;

            case 'Motherboard':
                this.setState({slideLoading:true});
                this.setState({slideNo:2})
                this.setState({motherboard:variant.productName})
                this.postData.map(post => {
                    if(post.productCategory === 'motherboard'){
                        return post.productID = variant._id
                    }
                })
                this.price.motherboardPrice = variant.finalPrice;
                this.slideChange.current.next();
                this.handleRam(variant);
                break;

            case 'Ram':
                this.setState({slideLoading:true});
                this.setState({ramQuantity:quantity})
                this.setState({slideNo:3})
                this.setState({ram:variant.productName})
                if(this.state.selectedRamQuantity === 2){
                    this.postData.push({productID:variant._id,productCategory: "ram"})
                }
                this.postData.map(post => {
                    this.setState({selectedRamQuantity:1})
                    if(post.productCategory === 'ram'){
                        return post.productID = variant._id
                    }
                })
                this.price.ramPrice = variant.finalPrice;
                this.slideChange.current.next();
                this.handleGpu(variant);
                break; 

            case 'GPU':
                this.setState({slideLoading:true});
                this.setState({slideNo:4})
                this.setState({GPU:variant.productName})
                this.postData.map(post => {
                    if(post.productCategory === 'gpu'){
                        return post.productID = variant._id
                    }
                })
                this.price.gpuPrice = variant.finalPrice;
                this.slideChange.current.next();
                this.handleSmps(variant);
                break;

            case 'SMPS':
                this.setState({slideLoading:true});
                this.setState({slideNo:5})
                this.setState({SMPS:variant.productName})
                this.postData.map(post => {
                    if(post.productCategory === 'smps'){
                        return post.productID = variant._id
                    }
                })
                this.price.smpsPrice = variant.finalPrice;
                this.slideChange.current.next();
                this.handleCase(variant);
                break;

            case 'Cases':
                this.setState({slideLoading:true});
                this.setState({slideNo:6})
                this.setState({caseImage:variant.productImages[0].s3URL})
                this.setState({cases:variant.productName})
                this.postData.map(post => {
                    if(post.productCategory === 'cases'){
                        return post.productID = variant._id
                    }
                })
                this.price.casePrice = variant.finalPrice;
                this.handleCooler(variant);
                this.slideChange.current.next();
                this.customPcData.customPcImage = variant.productImages[0].s3URL;
                break;

            case 'Cooler':
                this.setState({slideLoading:true});
                this.setState({slideNo:7})
                this.setState({cooler:variant.productName})
                this.postData.map(post => {
                    if(post.productCategory === 'cooler'){
                        return post.productID = variant._id
                    }
                })
                this.price.coolerPrice = variant.finalPrice;
                this.handleStorage1(variant);
                this.slideChange.current.next();   
                break;

            case 'Storage1':
                this.setState({slideLoading:true});
                this.setState({slideNo:8})
                this.setState({storage1:variant.productName})
                this.postData.map(post => {
                    if(post.productCategory === 'storage1'){
                        return post.productID = variant._id
                    }
                })
                this.price.storage1Price = variant.finalPrice;
                this.slideChange.current.next();
                this.handleStorage2(variant);
                break;

            case 'Storage2':
                this.setState({slideLoading:false});
                this.setState({slideNo:9})
                this.setState({storage2:variant.productName})
                this.postData.map(post => {
                    if(post.productCategory === 'storage2'){
                        return post.productID = variant._id
                    }
                })
                this.price.storage2Price = variant.finalPrice;
                this.setState({statusCompleted:true})
                break;
            default: this.setState({slideNo:0})
            }
        };

    // when clicking carousel initializing data
    handlePlatform = () => {
        this.setState({slideNo:0})
    }
    handleCpu = (type) => {
        var data;
        const cpuArr = this.state.allCategory.filter(allcat => {
            return allcat.category.match(/processor/gi);
        })
        console.log(cpuArr, 'cpu Arr')
        if(type === 'Intel'){
            data = cpuArr[0].buildYourPcFilter.filter(processor => {
                return processor.match(/core/gi)
            })
        } 
        else if(type === 'AMD' || this.state.platform === 'AMD') {
            data = cpuArr[0].buildYourPcFilter.filter(processor => {
                return processor.match(/ryzen/gi)
            })
        } else {
            data = cpuArr[0].buildYourPcFilter.filter(processor => {
                return processor.match(/core/gi)
            })
        }
        this.setState({productType:data})
        this.setState({categoryActive:data[0]})
        axios.post(`/product?limit=100&page=1&category=${cpuArr[0].category}`, {
            "buildYourPcFilter":data[0]
        })
        .then(res => {
            this.setState({productModal:res.data.products})
            // this.categorySlide.current.goToSlide(1);
            this.setState({slideLoading:false});
        })
        this.setState({slideNo:1})
    }
    handleMotherboard = () => {
        const motherboardArr = this.state.allCategory.filter(allcat => {
            return allcat.category.match(/motherboard/gi);
        })
        console.log(motherboardArr, 'array')
        this.setState({productType:motherboardArr[0].buildYourPcFilter})
        this.setState({categoryActive:motherboardArr[0].buildYourPcFilter[0]})
        axios.post(`/product?limit=100&page=1&category=${motherboardArr[0].category}`, {
            "buildYourPcFilter":motherboardArr[0].buildYourPcFilter[0],
            "subcategory":[this.state.platform],
            "motherboardMatcher":this.state.matcherData
        })
        .then(res => {
            this.setState({productModal:res.data.products})
            this.setState({slideLoading:false});
        })
        this.setState({slideNo:2})
    }
    handleRam = () => {
        const ramArr = this.state.allCategory.filter(allcat => {
            return allcat.category.match(/ram/gi);
        })
        const ramSub = ramArr[0].subcategory.filter(sub => {
            return sub.match(/desktop/gi);
        })
        this.setState({productType:ramArr[0].buildYourPcFilter})
        this.setState({categoryActive:ramArr[0].buildYourPcFilter[0]})
        axios.post(`/product?limit=100&page=1&category=${ramArr[0].category}`, {
            "buildYourPcFilter":ramArr[0].buildYourPcFilter[0],
            "subcategory":ramSub
        })
        .then(res => {
            this.setState({productModal:res.data.products})
            this.setState({slideLoading:false});
        })
        this.setState({slideNo:3})
    }
    handleGpu = () => {
        const gpuArr = this.state.allCategory.filter(allcat => {
            return allcat.category.match(/graphic/gi);
        })
        this.setState({productType:gpuArr[0].buildYourPcFilter})
        this.setState({categoryActive:gpuArr[0].buildYourPcFilter[0]})
        axios.post(`/product?limit=100&page=1&category=${gpuArr[0].category}`, {
            "buildYourPcFilter":gpuArr[0].buildYourPcFilter[0]
        })
        .then(res => {
            this.setState({productModal:res.data.products})
            this.setState({slideLoading:false});
        })
        this.setState({slideNo:4})
    }
    handleSmps = () => {
        const smpsArr = this.state.allCategory.filter(allcat => {
            return allcat.category.match(/power/gi);
        })
        this.setState({productType:smpsArr[0].buildYourPcFilter})
        this.setState({categoryActive:smpsArr[0].buildYourPcFilter[0]})
        axios.post(`/product?limit=100&page=1&category=${smpsArr[0].category}`, {
            "buildYourPcFilter":smpsArr[0].buildYourPcFilter[0]
        })
        .then(res => {
            this.setState({productModal:res.data.products})
            // this.categorySlide.current.goToSlide(1);
            this.setState({slideLoading:false});
        })
        this.setState({slideNo:5})
    }
    handleCase = () => {
        const caseArr = this.state.allCategory.filter(allcat => {
            return allcat.category.match(/cabinet/gi);
        })
        this.setState({productType:caseArr[0].buildYourPcFilter})
        this.setState({categoryActive:caseArr[0].buildYourPcFilter[0]})
        axios.post(`/product?limit=100&page=1&category=${caseArr[0].category}`, {
            "buildYourPcFilter":caseArr[0].buildYourPcFilter[0]
        })
        .then(res => {
            this.setState({productModal:res.data.products})
            // this.categorySlide.current.goToSlide(1);
            this.setState({slideLoading:false});
        })
        this.setState({slideNo:6})
    }
    handleCooler = () => {
        this.setState({slideLoading:true});
        const coolerArr = this.state.allCategory.filter(allcat => {
            return allcat.category.match(/cooler/gi);
        })
        this.setState({productType:coolerArr[0].buildYourPcFilter})
        this.setState({categoryActive:coolerArr[0].buildYourPcFilter[0]})
        axios.post(`/product?limit=100&page=1&category=${coolerArr[0].category}`, {
            "buildYourPcFilter":coolerArr[0].buildYourPcFilter[0]
        })
        .then(res => {
            this.setState({productModal:res.data.products})
            // this.categorySlide.current.goToSlide(1);
            this.setState({slideLoading:false});
        })
        this.setState({slideNo:7})
    }
    handleStorage1 = () => {
        this.setState({slideLoading:true});
        this.setState({selectedStorage:'ssd'})
        const storage1Arr = this.state.allCategory.filter(allcat => {
            return allcat.category.match(/ssd/gi);
        })
        this.setState({productType:storage1Arr[0].buildYourPcFilter})
        this.setState({categoryActive:storage1Arr[0].buildYourPcFilter[0]})
        axios.post(`/product?limit=100&page=1&category=${storage1Arr[0].category}`, {
            "buildYourPcFilter":storage1Arr[0].buildYourPcFilter[0]
        })
        .then(res => {
            this.setState({productModal:res.data.products})
            this.setState({slideLoading:false});
        })
        this.setState({slideNo:8})
    }
    selectStorage1 = () => {
        this.setState({slideLoading:true});
        this.setState({selectedStorage:'ssd'})
        const storage1Arr = this.state.allCategory.filter(allcat => {
            return allcat.category.match(/ssd/gi);
        })
        this.setState({productType:storage1Arr[0].buildYourPcFilter})
        this.setState({categoryActive:storage1Arr[0].buildYourPcFilter[0]})
        axios.post(`/product?limit=100&page=1&category=${storage1Arr[0].category}`, {
            "buildYourPcFilter":storage1Arr[0].buildYourPcFilter[0]
        })
        .then(res => {
            this.setState({productModal:res.data.products})
            this.setState({slideLoading:false});
        })
    }
    handleStorage2 = () => {
        this.setState({slideLoading:true});
        this.setState({selectedStorage:'ssd'})
        const storage2Arr = this.state.allCategory.filter(allcat => {
            return allcat.category.match(/ssd/gi);
        })
        this.setState({productType:storage2Arr[0].buildYourPcFilter})
        this.setState({categoryActive:storage2Arr[0].buildYourPcFilter[0]})
        axios.post(`/product?limit=100&page=1&category=${storage2Arr[0].category}`, {
            "buildYourPcFilter":storage2Arr[0].buildYourPcFilter[0]
        })
        .then(res => {
            this.setState({productModal:res.data.products})
            // this.categorySlide.current.goToSlide(1);
            this.setState({slideLoading:false});
        })
        this.setState({slideNo:9})
    }
    selectStorage2 = () => {
        this.setState({slideLoading:true});
        this.setState({selectedStorage:'hdd'})
        const storage2Arr = this.state.allCategory.filter(allcat => {
            return allcat.category.match(/hdd/gi);
        })
        this.setState({productType:storage2Arr[0].buildYourPcFilter})
        this.setState({categoryActive:storage2Arr[0].buildYourPcFilter[0]})
        axios.post(`/product?limit=100&page=1&category=${storage2Arr[0].category}`, {
            "buildYourPcFilter":storage2Arr[0].buildYourPcFilter[0]
        })
        .then(res => {
            this.setState({productModal:res.data.products})
            // this.categorySlide.current.goToSlide(1);
            this.setState({slideLoading:false});
        })
    }
    handleSave = () => {
        let auth_token = JSON.parse(localStorage.getItem("currentUser"));
		let headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${auth_token}`,
        }; 
        const updatedValues = this.postData.filter(post => {
            return post.productID !== ''
        })
        const data = {
            "customImage":this.customPcData.customPcImage,
            "products":  updatedValues
        }
        if(isLogin()){
            axios.post('/myBuild/add', data, {headers})
            .then(res => {
                this.setState({loading:false})
                this.setState({saved:'saved'})
            })
            .catch(error => {   
                this.setState({loading:false})
            })
        } else {
            this.props.alert.error('Login to save build', {timeout:3000})
        }       
    }
    handleMoreInfo = (modal) => {        
        axios.get(`/product/${modal._id}`)
        .then(res => {
            this.modalData = res.data.product;
            this.setState({moreInfoModal:true})
        })  
    }
    handleCart = () => {
        this.customPcData.totalPrice = this.price.cpuPrice + this.price.ramPrice + this.price.motherboardPrice + this.price.gpuPrice + this.price.smpsPrice + this.price.casePrice + this.price.coolerPrice + this.price.storage1Price + this.price.storage2Price
        const removedEmptyIds = this.postData.filter(post => {
            return post.productID !== ''
        })
        removedEmptyIds.map(post => {
            this.customPcData.customPcItemsID.push(post.productID)
        }) 
        this.props.onAddCart(this.customPcData);
        this.setState({added:true})
    }
    
    renderCarousel = () => {
        if(this.state.slideNo === 0){
            return(
            <React.Fragment>
                <div className="platform">
                    <p>Intel</p>
                    <p onClick={this.state.platform === 'Intel' ? null : ()=>this.handleSelect('Platform', 'Intel')} className={this.state.platform === 'Intel' ? "selected" : "select"}>{this.state.platform === 'Intel' ? 'SELECTED' : 'SELECT' }</p>
                </div>
                <div className="platform">
                    <p>AMD</p>
                    <p onClick={this.state.platform === 'AMD' ? null : ()=>this.handleSelect('Platform', 'AMD')} className={this.state.platform === 'AMD' ? "selected" : "select"}>{this.state.platform === 'AMD' ? 'SELECTED' : 'SELECT' }</p>
                </div>
            </React.Fragment>
            )
        }
        if(this.state.slideNo === 1){
            if(this.state.slideLoading){
                return <div className="d-flex justify-content-center py-150">
                    <ScaleLoader color="var(--base-danger, red)"/>
                </div>
            }
            return(
            <React.Fragment>
                <MultiCarousel ref={this.categorySlide} responsive={this.responsiveCategory}>  
                    {this.state.productType.map((processor,index) => {
                        console.log(processor, 'processor')
                        return <span 
                        key={index} 
                        onClick={()=>this.handleProductType(processor, 'processor')}
                        className={processor === this.state.categoryActive ? "category-active" : "category"}>{processor}</span>
                    })}
                </MultiCarousel>
                <div className="scroll-div">
                    {this.state.productModal.length === 0 ? <p style={{marginTop:70, textAlign:'center'}}>product not available</p> : 
                    this.state.productModal.map((modal,index) => {
                        if(modal.inventory === 0){
                            return null;
                        }
                        return <React.Fragment  key={index}> 
                        <div className="sub-spec">
                            <p style={{textTransform:'capitalize'}}>{modal.productName}<i onClick={()=>this.handleMoreInfo(modal)} className="more-info">MORE INFO</i></p>
                            <div style={{color:'white'}} onClick={this.state.CPU === modal.productName ? null : ()=>this.handleSelect('CPU', modal)} className={this.state.CPU === modal.productName ? "selected" : "select"}><BiRupee/>{modal.finalPrice}</div>
                        </div>
                        </React.Fragment>
                    })}  
                </div>
            </React.Fragment>
            )
        }
        if(this.state.slideNo === 2){
            if(this.state.slideLoading){
                return <div className="d-flex justify-content-center py-150">
                    <ScaleLoader color="var(--base-danger, red)"/>
                </div>
            }
            return(
            <React.Fragment>
                <MultiCarousel ref={this.categorySlide} responsive={this.responsiveCategory}>  
                    {this.state.productType.map((motherboard,index) => {
                        return <span key={index} onClick={()=>this.handleProductType(motherboard, 'motherboard')} className={motherboard === this.state.categoryActive ? "category-active c-pointer" : "category c-pointer"}>{motherboard}</span>
                    })}
                </MultiCarousel>
                <div className="scroll-div">
                    {this.state.productModal.length !== 0 ? 
                        this.state.productModal.map((modal,index) => {
                            if(modal.inventory === 0){
                                return null;
                            }
                        return <React.Fragment key={index}>                        
                        <div  className="sub-spec">
                            <p style={{textTransform:'capitalize'}}>{modal.productName}<i onClick={()=>this.handleMoreInfo(modal)} className="more-info">MORE INFO</i></p>
                            <div style={{color:'white'}} onClick={this.state.motherboard === modal.productName ? null : ()=>this.handleSelect('Motherboard', modal)} className={this.state.motherboard === modal.productName ? "selected" : "select"}><BiRupee/>{modal.finalPrice}</div>
                        </div>
                        </React.Fragment>
                    }) : <div className="pt-150 text-center">
                        <p>No products! choose a different category</p>
                        </div>}  
                </div>
            </React.Fragment>
            )
        }
        if(this.state.slideNo === 3){
            if(this.state.slideLoading){
                return <div className="py-150 d-flex justify-content-center">
                    <ScaleLoader color="var(--base-danger, red)"/>
                </div>
            }
            return(
            <React.Fragment>
               <MultiCarousel ref={this.categorySlide} responsive={this.responsiveCategory}>  
                    {this.state.productType.map((ram,index) => {
                        return <span key={index} onClick={()=>this.handleProductType(ram, 'ram', 1)} className={ram === this.state.categoryActive && this.state.selectedRamQuantity === 1 ? "category-active c-pointer" : "category c-pointer"}>{ram} x 1</span>
                    })}
                    {this.state.productType.map((ram,index) => {
                        return <span key={index} onClick={()=>this.handleProductType(ram, 'ram', 2)} className={ram === this.state.categoryActive && this.state.selectedRamQuantity === 2 ? "category-active c-pointer" : "category c-pointer"}>{ram} x 2</span>
                    })}
                </MultiCarousel>
                <div className="scroll-div">
                    {this.state.productModal.length !== 0 ? 
                    this.state.productModal.map((modal,index) => {
                        if(modal.inventory === 0){
                            return null;
                        }
                        return <React.Fragment key={index}>                        
                        <div  className="sub-spec">
                            <p style={{textTransform:'capitalize'}}>{modal.productName}.<i onClick={()=>this.handleMoreInfo(modal)} className="more-info">MORE INFO</i></p>
                            <div style={{color:'white'}} onClick={()=>this.handleSelect('Ram', modal, this.state.selectedRamQuantity)} className={"select"}><BiRupee/>{modal.finalPrice}</div>
                        </div>
                        </React.Fragment>
                    }) : <div className="py-150 text-center">
                    <p>No products! choose a different category</p>
                    </div>}  
                </div>
            </React.Fragment>
            )
        }
        if(this.state.slideNo === 4){
            if(this.state.slideLoading){
                return <div className="py-150 d-flex justify-content-center">
                    <ScaleLoader color="var(--base-danger, red)"/>
                </div>
            }
            return(
            <React.Fragment>
                <MultiCarousel ref={this.categorySlide} responsive={this.responsiveCategory}>  
                    {this.state.gpuSkip  ? null : <span onClick={()=>this.handleProductType(null, null,'gpu', 'SKIPPED')} className="skip">SKIP</span>}
                    {this.state.productType.map((gpu,index) => {
                        return <span key={index} onClick={()=>this.handleProductType(gpu, 'Graphic Card')} className={gpu === this.state.categoryActive ? "category-active c-pointer" : "category c-pointer"}>{gpu}</span>
                    })}
                </MultiCarousel>
                <div className="scroll-div">
                    {this.state.productModal.length !== 0 ? 
                    this.state.productModal.map((modal,index) => {
                        if(modal.inventory === 0){
                            return null;
                        }
                        return <React.Fragment key={index}>                        
                        <div  className="sub-spec">
                            <p style={{textTransform:'capitalize'}}>{modal.productName}.<i onClick={()=>this.handleMoreInfo(modal)} className="more-info">MORE INFO</i></p>
                            <div style={{color:'white'}} onClick={this.state.GPU === modal.productName ? null : ()=>this.handleSelect('GPU', modal)} className={this.state.GPU === modal.productName ? "selected" : "select"}><BiRupee/>{modal.finalPrice}</div>
                        </div>
                        </React.Fragment>
                    }) : <div className="py-150 text-center">
                    <p>No products! choose a different category</p>
                    </div>}  
                </div>
            </React.Fragment>
            )
        }
        if(this.state.slideNo === 5){
            if(this.state.slideLoading){
                return <div className="py-150 d-flex justify-content-center">
                    <ScaleLoader color="var(--base-danger, red)"/>
                </div>
            }
            return(
            <React.Fragment>
                <MultiCarousel  ref={this.categorySlide} responsive={this.responsiveCategory}>  
                    {this.state.productType.map((smps,index) => {
                        return <span key={index} onClick={()=>this.handleProductType(smps,'power supply')} className={smps === this.state.categoryActive ? "category-active c-pointer" : "category c-pointer"}>{smps}</span>
                    })}
                </MultiCarousel>
                <div className="scroll-div">
                    {this.state.productModal.length !== 0 ? 
                    this.state.productModal.map((modal,index) => {
                        if(modal.inventory === 0){
                            return null;
                        }
                        return <React.Fragment key={index}>                        
                        <div  className="sub-spec">
                            <p style={{textTransform:'capitalize'}}>{modal.productName}.<i onClick={()=>this.handleMoreInfo(modal)} className="more-info">MORE INFO</i></p>
                            <div style={{color:'white'}} onClick={this.state.SMPS === modal.productName ? null : ()=>this.handleSelect('SMPS', modal)} className={this.state.SMPS === modal.productName ? "selected" : "select"}><BiRupee/>{modal.finalPrice}</div>
                        </div>
                        </React.Fragment>
                    }) : <div className="py-150 text-center">
                    <p>No products! choose a different category</p>
                    </div>}  
                </div>
            </React.Fragment>
            )
        }
        if(this.state.slideNo === 6){
            if(this.state.slideLoading){
                return <div className="py-150 d-flex justify-content-center">
                    <ScaleLoader color="var(--base-danger, red)"/>
                </div>
            }
            return(
            <React.Fragment>
                <MultiCarousel ref={this.categorySlide} responsive={this.responsiveCategory}>  
                    {this.state.productType.map((cases,index) => {
                        return <span key={index} onClick={()=>this.handleProductType(cases, 'Cabinet')} className={cases === this.state.categoryActive ? "category-active c-pointer" : "category c-pointer"}>{cases}</span>
                    })}
                </MultiCarousel>
                <div className="scroll-div">
                    {this.state.productModal.length !== 0 ? 
                    this.state.productModal.map((modal,index) => {
                        if(modal.inventory === 0){
                            return null;
                        }
                        return <React.Fragment key={index}>                        
                        <div className="sub-spec">
                            <p style={{textTransform:'capitalize'}}>{modal.productName}.<i onClick={()=>this.handleMoreInfo(modal)} className="more-info">MORE INFO</i></p>
                            <div style={{color:'white'}} onClick={this.state.cases === modal.productName ? null : ()=>this.handleSelect('Cases', modal)} className={this.state.cases === modal.productName ? "selected" : "select"}><BiRupee/>{modal.finalPrice}</div>
                        </div>
                        </React.Fragment>
                    }) : <div className="py-150 text-center">
                    <p>No products! choose a different category</p>
                    </div>}  
                </div>
            </React.Fragment>
            )
        }
        if(this.state.slideNo === 7){
            if(this.state.slideLoading){
                return <div className="py-150 d-flex justify-content-center">
                    <ScaleLoader color="var(--base-danger, red)"/>
                </div>
            }
            return(
            <React.Fragment>
                <MultiCarousel ref={this.categorySlide} responsive={this.responsiveCategory}>  
                    {this.state.coolerSkip ? null : <span onClick={()=>this.handleProductType(null, null,'cooler', 'SKIPPED')} className="skip">SKIP</span>}
                    {this.state.productType.map((cooler,index) => {
                        return <span key={index} onClick={()=>this.handleProductType(cooler, 'Cooler')} className={cooler === this.state.categoryActive ? "category-active" : "category"}>{cooler}</span>
                    })}
                </MultiCarousel>
                <div className="scroll-div">
                    {this.state.productModal.length !== 0 ? 
                    this.state.productModal.map((modal,index) => {
                        if(modal.inventory === 0){
                            return null;
                        }
                        return <React.Fragment  key={index}>                        
                        <div className="sub-spec">
                            <p style={{textTransform:'capitalize'}}>{modal.productName}.<i onClick={()=>this.handleMoreInfo(modal)} className="more-info">MORE INFO</i></p>
                            <div style={{color:'white'}} onClick={this.state.cooler === modal.productName ? null : ()=>this.handleSelect('Cooler', modal)} className={this.state.cooler === modal.productName ? "selected" : "select"}><BiRupee/>{modal.finalPrice}</div>
                        </div>
                        </React.Fragment>
                    }) : <div className="py-150 text-center">
                    <p>No products! choose a different category</p>
                    </div>} 
                </div>
            </React.Fragment>
            )
        }
        if(this.state.slideNo === 8){
            if(this.state.slideLoading){
                return <div className="py-150 d-flex justify-content-center">
                    <ScaleLoader color="var(--base-danger, red)"/>
                </div>
            }
            return(
            <React.Fragment>
                <MultiCarousel ref={this.categorySlide} responsive={this.responsiveCategory}> 
                    <span onClick={()=>this.handleProductType(null, null,'storage1', 'SKIPPED')} className="skip">SKIP</span>
                    {this.state.productType.map((storage1,index) => {
                        return <span key={index} onClick={this.state.selectedStorage === 'ssd' ? ()=>this.handleProductType(storage1, 'ssd') : ()=>this.handleProductType(storage1, 'hdd')} className={storage1 === this.state.categoryActive ? "category-active c-pointer" : "category c-pointer"}>{storage1}</span>
                    })}
                </MultiCarousel>
                <div className="sub-spec">
                    <div style={{color:'white'}} onClick={this.selectStorage1} className={this.state.selectedStorage === 'ssd' ? "selected-storage" : "select"}>SSD</div>
                    <div style={{color:'white'}} onClick={this.selectStorage2} className={this.state.selectedStorage === 'hdd' ? "selected-storage" : "select"}>HDD</div>
                </div> 
                <div className="scroll-div-storage">
                    {this.state.productModal.length !== 0 ? 
                    this.state.productModal.map((modal,index) => {
                        if(modal.inventory === 0){
                            return null;
                        }
                        return <React.Fragment key={index}>                        
                        <div  className="sub-spec">
                            <p style={{textTransform:'capitalize'}}>{modal.productName}.<i onClick={()=>this.handleMoreInfo(modal)} className="more-info">MORE INFO</i></p>
                            <div style={{color:'white'}} onClick={this.state.storage1 === modal.productName ? null : ()=>this.handleSelect('Storage1', modal)} className={this.state.storage1 === modal.productName ? "selected" : "select"}><BiRupee/>{modal.finalPrice}</div>
                        </div>
                        </React.Fragment>
                    }) : <div className="py-150 text-center">
                    <p>No products! choose a different category</p>
                    </div>} 
                </div>
            </React.Fragment>
            )
        }
        if(this.state.slideNo === 9){
            if(this.state.slideLoading){
                return <div className="py-150 d-flex justify-content-center">
                    <ScaleLoader color="var(--base-danger, red)"/>
                </div>
            }
            return(
            <React.Fragment>
                <MultiCarousel ref={this.categorySlide} responsive={this.responsiveCategory}> 
                    <span onClick={()=>this.handleProductType(null, null,'storage2', 'SKIPPED')} className="skip">SKIP</span>
                    {this.state.productType.map((storage1,index) => {
                        return <span key={index} onClick={this.state.selectedStorage === 'ssd' ? ()=>this.handleProductType(storage1, 'ssd') : ()=>this.handleProductType(storage1, 'hdd')} className={storage1 === this.state.categoryActive ? "category-active" : "category"}>{storage1}</span>
                    })}
                </MultiCarousel>
                <div className="sub-spec">
                    <div style={{color:'white'}} onClick={this.selectStorage1} className={this.state.selectedStorage === 'ssd' ? "selected-storage" : "select"}>SSD</div>
                    <div style={{color:'white'}} onClick={this.selectStorage2} className={this.state.selectedStorage === 'hdd' ? "selected-storage" : "select"}>HDD</div>
                </div> 
                <div className="scroll-div">
                    {this.state.productModal.length !== 0 ? 
                    this.state.productModal.map((modal,index) => {
                        if(modal.inventory === 0){
                            return null;
                        }
                        return <React.Fragment key={index}>                        
                        <div className="sub-spec">
                            <p style={{textTransform:'capitalize'}}>{modal.productName}.<i onClick={()=>this.handleMoreInfo(modal)} className="more-info">MORE INFO</i></p>
                            <div style={{color:'white'}} onClick={this.state.storage2 === modal.productName ? null : ()=>this.handleSelect('Storage2', modal)} className={this.state.storage2 === modal.productName ? "selected" : "select"}><BiRupee/>{modal.finalPrice}</div>
                        </div>
                        </React.Fragment>
                    }) : <div cassName="py-150 text-center">
                    <p>Currently Unavailable</p>
                    </div>}  
                </div>
            </React.Fragment>
            )
        }
    }   

    render() {
        if(this.state.loading){
            return <div className="py-150 d-flex justify-content-center">
                <ScaleLoader color="var(--base-danger, red)"/>
            </div>
        }
        const MyVerticallyCenteredModal = (props) => {
            return (
            <Modal {...props}>
              <Modal.Header closeButton>PREVIEW</Modal.Header>
              <Modal.Body style={{height:'100%'}}>
              <Row>
            <Col>
                <Row>
                    <Col>
                    <div className="table-scroll">
                    <Table striped bordered hover variant='dark'>
                        <tbody>
                            <tr>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                            <GiPlatform size={35}/>
                                        </div>
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                            {this.state.platform ? this.state.platform : 'not selected'}
                                        </div>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div  style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                        <VscCircuitBoard size={35}/>
                                            {this.state.CPU ? <p id="table-price">{this.price.cpuPrice}</p> : null}
                                        </div>
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div  style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                            {this.state.CPU ? this.state.CPU : 'not selected'}
                                        </div>
                                    </span>
                                </td>
                            </tr> 
                            <tr>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                        <GiEmptyChessboard size={35}/>
                                            {this.state.motherboard ? <p id="table-price">{this.price.motherboardPrice}</p> : null}
                                        </div>
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                            {this.state.motherboard ? this.state.motherboard : 'not selected'}
                                        </div>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div  style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                        <CgSmartphoneRam size={35}/>
                                        {this.state.ram ? <p id="table-price">{this.price.ramPrice} x {this.state.ramQuantity}</p> : null}
                                        </div>
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div  style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                            {this.state.ram ? this.state.ram : 'not selected'}
                                        </div>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div  style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                        <RiRadio2Line size={35}/>
                                        {this.state.GPU ? <p id="table-price">{this.price.gpuPrice}</p> : null}
                                        </div>
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div  style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                            {this.state.GPU ? this.state.GPU : 'not selected'}
                                        </div>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                        <BsPlug size={35}/>
                                        {this.state.SMPS ? <p id="table-price">{this.price.smpsPrice}</p> : null}
                                        </div>
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                            {this.state.SMPS ? this.state.SMPS : 'not selected'}
                                        </div>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div  style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                        <BiCabinet size={35}/>
                                        {this.state.cases ? <p id="table-price">{this.price.casePrice}</p> : null}
                                        </div>
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                            {this.state.cases ? this.state.cases : 'not selected'}
                                        </div>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                        <GiComputerFan size={35}/>
                                        {this.state.cooler ? <p id="table-price">{this.price.coolerPrice}</p> : null}
                                        </div>
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                            {this.state.cooler ? this.state.cooler : 'not selected'}
                                        </div>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>                  
                                            <MdSdStorage size={35}/>
                                            {this.state.storage1 ? <p id="table-price">{this.price.storage1Price}</p> : null}
                                        </div>
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                            {this.state.storage1 ? this.state.storage1 : 'not selected'}
                                        </div>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>                                           
                                            <MdSdStorage size={35}/>
                                            {this.state.storage2 ? <p id="table-price">{this.price.storage2Price}</p> : null}
                                        </div>
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: "flex" }}>
                                        <div style={{color: "#CDCDCD",fontWeight: 700, marginLeft: "20px"}}>
                                            {this.state.storage2 ? this.state.storage2 : 'not selected'}
                                        </div>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    </div>
                    </Col>
                </Row>
            </Col>
          </Row>
              </Modal.Body>
            </Modal>
          );
        }
        const ModalInfo = (props) => {
            return (
                <Modal {...props}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body style={{height:'100%'}}>
                <Row>
                  <Col lg={12} md={12} sm={12} style={{ textAlign: "center" }}>
                      <img
                        src={this.modalData ? this.modalData.productImages[0].s3URL : null}
                        width='65%'
                        style={{ marginBottom: "32px" }}
                        alt="hello"
                        />
                      <br></br>
                      <div>
                          <p style={{fontWeight:'bold'}}>Rs. {this.modalData ? this.modalData.finalPrice : null}</p>
                      </div>
                      {this.modalData ?
                      <div style={{marginTop:10, marginBottom:10}}>
                        <a style={{borderBottom:'1px solid'}} href={this.modalData.warranty} rel="noopener noreferrer" target="_blank">Warranty Link: {this.modalData.warranty}</a> 
                        </div>: null }
                  </Col>
              <Col>
                  <Row>
                      <Col>
                      <Table striped bordered hover variant='dark'>
                          <tbody>
                              {this.modalData ? this.modalData.specifications.map((spec,index) => {
                              return <tr key={index}>
                                  <td>
                                      <span style={{ display: "flex" }}>
                                          <div style={{color: "#CDCDCD", fontWeight: 700, marginLeft: "20px"}}>
                                              {spec.key}
                                          </div>
                                      </span>
                                  </td>
                                  <td>
                                      <span style={{ display: "flex" }}>
                                          <div style={{color: "#CDCDCD", fontWeight: 700, marginLeft: "20px"}}>
                                              {spec.value}
                                          </div>
                                      </span>
                                  </td>
                              </tr>}) : null}
                          </tbody>
                      </Table>
                      </Col>
                  </Row>
              </Col>
            </Row>
                </Modal.Body>
              </Modal>
          );
        }
        return (
            <React.Fragment>
                <section className="pc-build-area bg-base-dark pt-150 pb-50">
                    <Helmet>
                        <title>{pageData.title} | {Config.challengers__sub}</title>
                        <link rel="canonical" href={window.location.href} />
                        <meta property="og:url" content={window.location.href} />
                        <meta property="og:type" content={Config.challengers__websiteType} />

                        <meta property="og:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
                        <meta itemprop="name" content={`${Config.challengers__title} | ${Config.challengers__sub}`} />
                        <meta name="twitter:title" content={`${Config.challengers__title} | ${Config.challengers__sub}`}/>

                        <meta property="og:description" content={pageData.excerpt} />
                        <meta itemprop="description" content={pageData.excerpt} />
                        <meta name="twitter:description" content={pageData.excerpt} />
                    </Helmet>

                <motion.div initial='out' animate='in' exit='out' variants={pageTransition} transition={{ duration: 1 }}>
                {/* <Toolbar id='toolbar-desktop-space'></Toolbar>
                <Toolbar id='toolbar-mobile-space'></Toolbar>
                <Toolbar id='toolbar-mobile-space'></Toolbar>                 */}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-title fs-3xl mb-5">{pageData.heading}</h1>
                        </div>
                    </div>
                </div>
                <Container>
                    <Row>
                        <Col lg={7} md={7} sm={12}>
                            <div className="container-carousel">
                                {this.renderCarousel()}
                            </div>
                            <br/>
                            <MultiCarousel ref={this.slideChange} responsive={this.responsive}>  
                                <div onClick={this.handlePlatform} className="outer-div">
                                    {this.state.platform ? <p id="topCategory">PLATFORM</p> : <p id="topCategory">&nbsp;</p>}
                                    <div className={this.state.slideNo === 0 ? 'icon-div-active' : "icon-div"}>
                                    {this.state.platform ? <span style={{paddingRight:10, color:'green'}}><FaCheck/></span> : null}{this.state.platform ? this.state.platform : 'PLATFORM'}
                                    </div>
                                </div>
                                <div onClick={this.state.platform ? this.handleCpu : null} className={"outer-div"}>
                                    {this.state.CPU ? <p id="topCategory">CPU</p> : <p id="topCategory">&nbsp;</p>}
                                    <div className={this.state.slideNo === 1 ? 'icon-div-active' : this.state.platform ? "icon-div" : "icon-div-no-hover"}>
                                    {this.state.CPU ? <span style={{paddingRight:10, color:'green'}}><FaCheck/></span> : null}{this.state.CPU ? this.state.CPU : 'CPU'}
                                    </div>
                                </div>
                                <div onClick={this.state.CPU ? this.handleMotherboard : null} className="outer-div">
                                {this.state.motherboard ? <p id="topCategory">MOTHERBOARD</p> : <p id="topCategory">&nbsp;</p>}
                                    <div className={this.state.slideNo === 2 ? 'icon-div-active' : this.state.CPU ? "icon-div" : "icon-div-no-hover"}>
                                    {this.state.motherboard ? <span style={{paddingRight:10, color:'green'}}><FaCheck/></span> : null}{this.state.motherboard ? this.state.motherboard : 'MOTHERBOARD'}
                                    </div>
                                </div>
                                <div onClick={this.state.motherboard ? this.handleRam : null} className="outer-div">
                                {this.state.ram ? <p id="topCategory">RAM</p> : <p id="topCategory">&nbsp;</p>}
                                    <div className={this.state.slideNo === 3 ? 'icon-div-active' : this.state.motherboard ? "icon-div" : "icon-div-no-hover"}>
                                    {this.state.ram ? <span style={{paddingRight:10, color:'green'}}><FaCheck/></span> : null}{this.state.ram ? this.state.ram : 'RAM'}
                                    </div>
                                </div>
                                <div onClick={this.state.ram ? this.handleGpu : null} className="outer-div">
                                {this.state.GPU ? <p id="topCategory">GPU</p> : <p id="topCategory">&nbsp;</p>}
                                    <div className={this.state.slideNo === 4 ? 'icon-div-active' : this.state.ram ? "icon-div" : "icon-div-no-hover"}>
                                    {this.state.GPU ? <span style={{paddingRight:10, color:'green'}}><FaCheck/></span> : null}{this.state.GPU ? this.state.GPU : 'GPU'}
                                    </div>
                                </div>
                                <div onClick={this.state.GPU ? this.handleSmps : null} className="outer-div">
                                {this.state.SMPS ? <p id="topCategory">SMPS</p> : <p id="topCategory">&nbsp;</p>}
                                    <div className={this.state.slideNo === 5 ? 'icon-div-active' : this.state.GPU ? "icon-div" : "icon-div-no-hover"}>
                                    {this.state.SMPS ? <span style={{paddingRight:10, color:'green'}}><FaCheck/></span> : null}{this.state.SMPS ? this.state.SMPS : 'SMPS'}
                                    </div>
                                </div>
                                <div onClick={this.state.SMPS ? this.handleCase : null} className="outer-div">
                                {this.state.cases ? <p id="topCategory">CASE</p> : <p id="topCategory">&nbsp;</p>}
                                    <div className={this.state.slideNo === 6 ? 'icon-div-active' : this.state.SMPS ? "icon-div" : "icon-div-no-hover"}>
                                    {this.state.cases ? <span style={{paddingRight:10, color:'green'}}><FaCheck/></span> : null} {this.state.cases ? this.state.cases : 'CASE'}
                                    </div>
                                </div>
                                <div onClick={this.state.cases ? this.handleCooler : null} className="outer-div">
                                {this.state.cooler ? <p id="topCategory">COOLER</p> : <p id="topCategory">&nbsp;</p>}
                                    <div className={this.state.slideNo === 7 ? 'icon-div-active' : this.state.cases ? "icon-div" : "icon-div-no-hover"}>
                                    {this.state.cooler ? <span style={{paddingRight:10, color:'green'}}><FaCheck/></span> : null}{this.state.cooler ? this.state.cooler : 'COOLER'}
                                    </div>
                                </div>
                                <div onClick={this.state.cooler ? this.handleStorage1 : null} className="outer-div">
                                {this.state.storage1 ? <p id="topCategory">STORAGE 1</p> : <p id="topCategory">&nbsp;</p>}
                                    <div className={this.state.slideNo === 8 ? 'icon-div-active' : this.state.cooler ? "icon-div" : "icon-div-no-hover"}>
                                    {this.state.storage1 ? <span style={{paddingRight:10, color:'green'}}><FaCheck/></span> : null}{this.state.storage1 ? this.state.storage1 : 'STORAGE 1'}
                                    </div>
                                </div>
                                <div onClick={this.state.storage1 ? this.handleStorage2 : null} className="outer-div">
                                {this.state.storage2 ? <p id="topCategory">STORAGE 2</p> : <p id="topCategory">&nbsp;</p>}
                                    <div className={this.state.slideNo === 9 ? 'icon-div-active' : this.state.storage1 ? "icon-div" : "icon-div-no-hover"}>
                                    {this.state.storage2 ? <span style={{paddingRight:10, color:'green'}}><FaCheck/></span> : null}{this.state.storage2 ? this.state.storage2 : 'STORAGE 2'}
                                    </div>
                                </div>
                            </MultiCarousel>
                            <br/>
                        </Col>
                        
                        <Col className="case-col"  lg={5} md={5} sm={12}>
                            <Card id='customize-stackbottom'>
                                <img height="300px" src={this.state.caseImage ? this.state.caseImage : CpuCase} alt='case'/>
                            </Card> 
                            <span style={{ marginTop:40, display: "flex", alignItems:'end', justifyContent:'space-between' }}>
                                <h3 style={{ color: "white" }}><BiRupee/>{this.price.cpuPrice + this.price.ramPrice * this.state.ramQuantity + this.price.motherboardPrice + this.price.gpuPrice + this.price.smpsPrice + this.price.casePrice + this.price.coolerPrice + this.price.storage1Price + this.price.storage2Price}</h3>
                                <p onClick={()=>this.setState({modalShow:true})} style={{cursor:'pointer',borderBottom:'1px solid',top: '5px',fontSize: '20px'}}>View Specs</p>
                            </span>
                            <div style={{ marginTop: "15px" }}>
                            <button 
                                onClick={this.state.statusCompleted && !this.state.saved ? this.handleSave : null} 
                                style={{marginRight:10}} 
                                className={this.state.statusCompleted  ? "el-btn el-btn-success" : "el-btn el-btn-success-a10 disabled"}>
                                    {this.state.loading ? 'SAVING BUILD...' : this.state.saved  ? 'BUILD SAVED' : 'SAVE BUILD'}
                                {/* <Heart style={{ width: "18px", marginLeft: "5px" }} /> */}
                            </button> 
                            <button onClick={this.state.added ? ()=>this.props.history.push('/YourCart') :  this.state.statusCompleted  ? this.handleCart : null } className={this.state.statusCompleted  ? 'el-btn el-btn__danger' : 'el-btn el-btn__danger disabled'}>
                               {this.state.added ? "CONTINUE TO CART" : "ADD TO CART"}
                            <ShoppingCart style={{ width: "18px", marginLeft: "10px" }}/>
                            </button>
                            </div>     
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col lg={12}>
                            <Card style={{marginTop: 32, background: "#191c27", color: "#DBDBDB"}}>
                                <Card.Body>
                                    <Card.Subtitle
                                    className='mb-2 text-muted'
                                    style={{ fontWeight: "600" }}>
                                    Warranty &amp; Replacement
                                    </Card.Subtitle>
                                    <Card.Text>
                                    sample warranty <br/>
                                    sample replacement
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row> */}
                    <MyVerticallyCenteredModal show={this.state.modalShow} onHide={()=>this.setState({modalShow:false})}/>
                    <ModalInfo show={this.state.moreInfoModal} onHide={()=>this.setState({moreInfoModal:false})}/>
                </Container>
                </motion.div>
                </section>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onAddCart: (data) => dispatch(addCustomPc(data))
    }
  }

export default connect(null, mapDispatchToProps)(withAlert()(customizeYourself));

const pageData = {
  title: "Pc Builder",
  heading: `Pc Builder - Build Your Own Computer - ${Config.challengers__title}`,
  excerpt: 'Build your own PC with Challlenger Computers PC builder at a low price. Choose your CPU, GPU, RAM, SSD, HDD and more!'
}