import React, { useEffect, useRef, useState } from "react";
import { BsExclamationLg } from "react-icons/bs";
import { DiBingSmall } from "react-icons/di";
import { FaYahoo, FaYoutube, FaTwitch, FaReddit, FaImdb, FaGithub, FaTree} from "react-icons/fa";
import { FcGoogle, FcWikipedia } from "react-icons/fc";
import { MdSearch } from "react-icons/md";
import { SiDuckduckgo } from "react-icons/si";
import amazon from "../../styles/home/amazon.png";
import  MailboxButton  from "../../components/mailboxButton";
import {
	AlertBox,
	AlertDesc,
	AlertRow,
	AlertSource,
	AlertTimes,
	AlertTitle,
	AlertTop,
	Content,
	FunctionBox,
	Time,
	Greetings,
	Container,
	ContainerFooter,
	MenuContainer,
	MenuMoreWeatherInfo,
	MenuTitle,
	SearchBox,
	SearchForm,
	UrlInput,
	WeatherMenuInfo,
} from "../../styles/home/main";

import { useClickAway } from "react-use";
import WeatherWidget from "./parts/weatherwidget";

import ModalRoot from "../../components/modal/modalRoot";
import ModalService from "../../components/modal/services/modalService";
import AddtabModal from "./addtabModal";
import MailModal  from "./addmailModal";
import EdittabModal from "./edittabModal";
import CityModal from "./cityModal";
import ConfigModal from "./configModal";
import WidgetMobile from "./mobileWidget";


import Cards from "./parts/cards";
import Background from "../../layout/background";
import { ModalContainer } from "../../styles/modal/main";
import MenuBar from "../shared/menubar";
import { Link } from "react-router-dom";
import BackgroundModal from "./changeBackgroundModal";
import Shortcuts from "../shared/shortcutsModal";
import CalculatorButton from "../../components/calculatorButton";

const Home = (props) => {
	const [cityData, setCityData] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
	  const timer = setTimeout(() => {
		setIsVisible(true);
	  }, 500);
  
	  return () => clearTimeout(timer);
	}, []);

	const [unit, setUnit] = useState("");
	const [engine, setEngine] = useState("");
	const [mailbox, setMailbox] = useState("");
	const [time, setTime] = useState(
		`${new Date().getHours() < 10 ? "0" : ""}${new Date().getHours()}:${new Date().getMinutes() < 10 ? "0" : ""}${new Date().getMinutes()}`
	);
	const alertsRef = useRef("");
	const [nickname, setNickname] = useState('');
	const [mark, setMark] = useState('');
	const [menu, openMenu] = useState(false);
	const [alerts, openAlerts] = useState(true);
	const [res, setRes] = useState();
	const [message, setMessage] = useState("Good morning");

	const [status, setStatus] = useState("idle");
	const [data, setData] = useState([]);
	const [windDir, setWindDir] = useState("");
	const [icon, setIcon] = useState(null);
	const [sunrise, setSunrise] = useState("");
	const [sunset, setSunset] = useState("");
	
	const [backgroundType, setBackgroundType] = useState(null);
	const [backgroundNumber, setBackgroundNumber] = useState(null);
	const [hexColor, setHexColor] = useState('');
	const [shadow, setShadow] = useState(null);

	const searchRef = useRef(null);
	const apikey = "0849360447e69eda07189e0b383ff858";

	useClickAway(alertsRef, () => openAlerts(false), ["mouseup"]);



	useEffect(() => {
		if(!cityData)
			if (localStorage.getItem("cityData")) 
				setCityData(JSON.parse(localStorage.getItem("cityData")));
			else {
				const baseCityData = {"city":"Brussels","country":"BE","state":"Brussels","lat":50.8503396,"lon":4.3517103};
				localStorage.setItem("cityData", JSON.stringify(baseCityData));
				setCityData(baseCityData);
			}
		if (!mailbox) 
			if (localStorage.getItem("mailbox")) 
				setMailbox(localStorage.getItem("mailbox"));
			else {
				const baseMailbox = 'gmail';
				localStorage.setItem('mailbox', baseMailbox);
				setMailbox(baseMailbox);
			}

		if (!engine) 
			if (localStorage.getItem("searchengine"))
				setEngine(localStorage.getItem("searchengine"));
			else {
				const baseEngine = 'google';
				localStorage.setItem('searchengine', baseEngine);
				setEngine(baseEngine);
			}
		if (!unit)
			if (localStorage.getItem("tempunit")) 
				setUnit(localStorage.getItem("tempunit"));
			else {
				const baseUnit = 'metric';
				localStorage.setItem('tempunit', baseUnit);
				setUnit(baseUnit);
			}
		if (!backgroundType) 
			if(localStorage.getItem("backgroundType")) 
				setBackgroundType(localStorage.getItem("backgroundType"));
			else {
				const baseBgType = 'photo';
				localStorage.setItem('backgroundType', baseBgType);
				setBackgroundType(baseBgType);
			}
		if (backgroundType === "photo")
			if (localStorage.getItem("backgroundNumber"))
				 setBackgroundNumber(localStorage.getItem("backgroundNumber"));
			else {
				const baseBgNum = 8;
				localStorage.setItem('backgroundNumber', baseBgNum);
				setBackgroundNumber(baseBgNum);
			}
		if (!nickname)
			if(localStorage.getItem('nickname'))
				setNickname(localStorage.getItem('nickname'));
			else
				localStorage.setItem('nickname', '');
		if (!hexColor)
			if (localStorage.getItem('backgroundColor'))
				setHexColor(localStorage.getItem('backgroundColor'));
			else
				localStorage.setItem('backgroundColor', '');
		if (!shadow)
			if (localStorage.getItem('backgroundShadow'))
				setShadow(localStorage.getItem('backgroundShadow'));
			else
				localStorage.setItem('backgroundShadow', '50');
		if (!cityData) return;

		const fetchData = async () => {
			setStatus("Fetching");
			const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.lat}&lon=${cityData.lon}&units=${unit}&appid=${apikey}`);
			const data = await response.json();

			const timeNow = new Date().getHours(); 
			let overrideIcon;
			if ((timeNow > 22) || (timeNow >= 0 && timeNow < 6)) {
				overrideIcon = data.current.weather[0].icon;
			} else {
				overrideIcon = data.current.weather[0].icon.replace('n', 'd');
			}
			setData(data);
			setIcon(`https://openweathermap.org/img/wn/${overrideIcon}.png`);
			setStatus("Done");
		};
		if (status === "idle" || status === 'reload') 
		fetchData();
	}, [status, unit, cityData, backgroundType, engine, mailbox, hexColor, shadow, nickname]);


	useEffect(() => {
		const interval = setInterval(async () => {
			setStatus("Updating");
			const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.lat}&lon=${cityData.lon}&units=${unit}&appid=${apikey}`);
			const data = await response.json();

			setData(data);
			setIcon(`https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`);
			setStatus("Done");
		}, 1000 * 60 * 15);
		return () => {
			clearInterval(interval);
		};
	}, [cityData, unit]);

	useEffect(() => {
		const interval = setInterval(() => {
			let hour = new Date().getHours();
			let mins = new Date().getMinutes();
			const result = `${hour < 10 ? "0" : ""}${hour}:${mins < 10 ? "0" : ""}${mins}`;
			setTime(result);
		}, 5000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (searchRef.current === document.activeElement) return;
			if (e.shiftKey && e.keyCode === 71) {
				localStorage.setItem('searchengine', 'google');
				setEngine('google');
			} else if (e.shiftKey && e.keyCode === 68) {
				localStorage.setItem('searchengine', 'duckduckgo');
				setEngine('duckduckgo');
			} else if (e.shiftKey && e.keyCode === 66) {
				localStorage.setItem('searchengine', 'bing');
				setEngine('bing');
			} else if (e.shiftKey && e.keyCode === 49) {
				localStorage.setItem('searchengine', 'yahoo');
				setEngine('yahoo');
			} else if (e.shiftKey && e.keyCode === 65) {
				localStorage.setItem('searchengine', 'amazon');
				setEngine('amazon');
			} else if (e.shiftKey && e.keyCode === 82) {
				localStorage.setItem('searchengine', 'reddit');
				setEngine('reddit');
			} else if (e.shiftKey && e.keyCode === 84) {
				localStorage.setItem('searchengine', 'twitch');
				setEngine('twitch');
			} else if (e.shiftKey && e.keyCode === 89) {
				localStorage.setItem('searchengine', 'youtube');
				setEngine('youtube');
			} else if (e.shiftKey && e.keyCode === 87) {
				localStorage.setItem('searchengine', 'wikipedia');
				setEngine('wikipedia');
			} else if (e.shiftKey && e.keyCode === 73) {
				localStorage.setItem('searchengine', 'imdb');
				setEngine('imdb');
			} else if (e.shiftKey && e.keyCode === 72) {
				localStorage.setItem('searchengine', 'github');
				setEngine('github');
			} else if (e.shiftKey && e.keyCode === 69) {
				localStorage.setItem('searchengine', 'ecosia');
				setEngine('ecosia');
			} else if (e.shiftKey && e.keyCode === 70) {
				e.preventDefault();
				searchRef.current.focus();
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		}

	}, []);

	useEffect(() => {
		const msg = rollMessage();
		setMessage(msg);
	}, []);

	const rollMessage = () => {
		let msg, time = '';
		const hour = new Date().getHours();
		const messages = [
			'Hello',
			'Hi',
			'Time to work',
			"Hope you're fine",
			'Good ',
			'Have a good ',
			'How do you feel this ',
			'Amazing job this ',
			'Enjoy the ',
			"Don't lose this ",
			'Great job this ',
			'You are awesome this ',
			'You are doing great this ',
		]
		const randomNum = Math.floor(Math.random() * messages.length);
		if (randomNum > 3) {
			if (hour >= 5 && hour < 12) time = 'morning';
			else if (hour >= 12 && hour < 18) time = 'afternoon';
			else time = 'evening';
		}
		if (randomNum === messages.length - 1) {
			setMark('!');
		} else {
			setMark('!');
		}
		msg = `${messages[randomNum]}${time}`;

		return msg;
	}

	const setAdditionals = () => {
		const tdSunrise = new Date(data.current.sunrise * 1000);
		const tdSunset = new Date(data.current.sunset * 1000);
		const sunriseTime = `${tdSunrise.getHours()}:${tdSunrise.getMinutes() < 10 ? "0" : ""}${tdSunrise.getMinutes()}`;
		const sunsetTime = `${tdSunset.getHours()}:${tdSunset.getMinutes() < 10 ? "0" : ""}${tdSunset.getMinutes()}`;
		setSunrise(sunriseTime);
		setSunset(sunsetTime);

		const degrees = data.current.wind_deg;
		if (degrees < 22.5 || degrees >= 337.5) setWindDir("N");
		else if (degrees >= 22.5 && degrees < 67.5) setWindDir("NE");
		else if (degrees >= 67.5 && degrees < 112.5) setWindDir("E");
		else if (degrees >= 112.5 && degrees < 157.5) setWindDir("SE");
		else if (degrees >= 157.5 && degrees < 202.5) setWindDir("S");
		else if (degrees >= 202.5 && degrees < 247.5) setWindDir("SW");
		else if (degrees >= 247.5 && degrees < 292.5) setWindDir("W");
		else if (degrees >= 292.5 && degrees < 337.5) setWindDir("NW");
	};


	const searchUrl = (e) => {
		e.preventDefault();
		let enginePrefix;
		if (engine === "google") enginePrefix = "https://www.google.com/search?q=";
		else if (engine === "bing") enginePrefix = "https://www.bing.com/search?q=";
		else if (engine === "yahoo") enginePrefix = "https://search.yahoo.com/search?p=";
		else if (engine === "amazon") enginePrefix = "https://www.amazon.fr/s?k=";
		else if (engine === "imdb") enginePrefix = "https://www.imdb.com/find/?q=";
		else if (engine === "reddit") enginePrefix = "https://www.reddit.com/search/?q=";
		else if (engine === "twitch") enginePrefix = "https://www.twitch.tv/search?term=";
		else if (engine === "youtube") enginePrefix = "https://www.youtube.com/results?search_query=";
		else if (engine === "wikipedia") enginePrefix = "https://en.wikipedia.org/w/index.php?search=";
		else if (engine === "github") enginePrefix = "https://github.com/search?q=";
		else if (engine === "ecosia") enginePrefix = "https://www.ecosia.org/search?method=index&q=";
		else enginePrefix = "https://duckduckgo.com/?q=";

		const searchInNew = localStorage.getItem('searchInNewWindow');
		
		const whatDoWeSearch = e.currentTarget.url.value;


		const specialChars = ['#', '%', '&'];
		let formatSearchInput = whatDoWeSearch;
		// eslint-disable-next-line array-callback-return
		specialChars.some((element) => {
			if (whatDoWeSearch.includes(element)) {
				formatSearchInput = whatDoWeSearch
					.replace('%', '%25')
					.replace('#', '%23')
					.replace('&', '%26');
			}
		});

		if (formatSearchInput === "") return;
		const setUrl = `${enginePrefix}${formatSearchInput}`;
		window.open(setUrl, !!searchInNew ? '_blank' : '_self');
		e.currentTarget.url.value = "";
	};

	if (status === "Done" && sunrise === "") setAdditionals();

	const openModal = (modalFunction) => {
		modalFunction();
		setIsModalOpen(true);
	  };
	

	  const addModal = () => openModal(() => ModalService.open(AddtabModal));
	  const mailModal = () => openModal(() => ModalService.open(MailModal));
	  const addEditModal = () => openModal(() => ModalService.open(EdittabModal));
	  const changeCity = () => openModal(() => ModalService.open(CityModal));
	  const changeBackground = () => openModal(() => ModalService.open(BackgroundModal));
	  const configModal = () => openModal(() => ModalService.open(ConfigModal));

	  const openWidget = () => openModal(() => ModalService.open(WidgetMobile));
	  const showShortcuts = () => openModal(() => ModalService.open(Shortcuts));

	const closeModal = () => {
		setIsModalOpen(false);
	  };
	
	const refreshCards = () => setRes({});
	const refreshConfig = () => {
		setEngine(localStorage.getItem("searchengine"));
		setUnit(localStorage.getItem("tempunit"));
		setMailbox(localStorage.getItem("mailbox"));
	};
	const refreshNickname = () => setNickname(localStorage.getItem('nickname'));
	const refreshData = () => {
		setCityData(JSON.parse(localStorage.getItem('cityData')));
		setStatus('reload');
	};
	


	const changeBackgroundToImg = (e) => {
		const backgroundNumber = e.currentTarget.children[0].dataset.index;
		localStorage.setItem("backgroundType", 'photo');
		localStorage.setItem("backgroundNumber", backgroundNumber);
		setBackgroundType('photo');
		setBackgroundNumber(backgroundNumber)
	}
	const changeBackgroundToLapse = () => {
		localStorage.setItem("backgroundType", 'lapse');
		localStorage.setItem("backgroundNumber", '');
		setBackgroundType('lapse');
		setBackgroundNumber(null);
	}
	const changeBackgroundToCustom = () => {
		localStorage.setItem("backgroundType", 'custom');
		localStorage.setItem("backgroundNumber", '');
		setBackgroundType('custom');
		setBackgroundNumber(null);
	}
	const changeBackgroundToColor = (hex) => {
		localStorage.setItem("backgroundType", 'color');
		localStorage.setItem("backgroundNumber", '');
		setHexColor(hex);
		setBackgroundType('color');
		setBackgroundNumber(null);
	}
	const changeBackgroundShadow = (shadowValue) => setShadow(shadowValue);

	return (
		
		<Background bgType={backgroundType} bgNumber={backgroundNumber} hexColor={hexColor} shadowValue={shadow}>
			<ModalRoot 
				data={data} 
				wdir={windDir} 
				changeBackgroundToImg={changeBackgroundToImg} 
				changeBackgroundToLapse={changeBackgroundToLapse} 
				changeBackgroundToCustom={changeBackgroundToCustom}
				changeBackgroundToColor={changeBackgroundToColor}
				changeBackgroundShadow={changeBackgroundShadow}
				refreshCards={refreshCards}
				closeModal={closeModal}
				refreshData={refreshData} 
				refreshEngines={refreshConfig}
				refreshMailboxes={refreshConfig}
				refreshNickname={refreshNickname}
				refresh={res}
			/>
			<Container>
			<ModalContainer>
				<MenuContainer>
					<MenuBar
						toggleDM={props.toggleDM} 
						addModal={addModal}
						mailModal={mailModal}
						changeCity={changeCity}
						changeBackground={changeBackground}
						configModal={configModal}
						showShortcuts={showShortcuts}
						page="landing"
					/>

					{status === "Done" && (
						<ModalContainer flex jccenter aicenter>
							<WeatherWidget
								data={data}
								cityname={cityData.city}
								country={cityData.country}
								windDir={windDir}
								unit={unit}
								menu={menu}
								icon={icon}
								sr={sunrise}
								ss={sunset}
								toggleMenu={() => openMenu(!menu)}
								closeMenu={() => openMenu(false)}
								widgetModal={() => openWidget(true)}
							/>
							<WeatherMenuInfo as={Link} to="/weather">{cityData.city}</WeatherMenuInfo>
							<WeatherMenuInfo as={Link} to="/weather">
								{data.current.temp}
								<sup>
									{unit === "metric" ? "°C" : null}
									{unit === "imperial" ? "°F" : null}
									{unit === "default" ? "°K" : null}
								</sup>
							</WeatherMenuInfo>
							{data.alerts && (
								<>
									<AlertBox>
										<BsExclamationLg onClick={() => openAlerts(true)} />
									</AlertBox>
									<MenuMoreWeatherInfo alerts nopadd ref={alertsRef} show={alerts}>
										<MenuTitle>Active alerts:</MenuTitle>
										{data.alerts.map((alert, index) => {
											const from = new Date(alert.start * 1000);
											const to = new Date(alert.end * 1000);
											const fromTime = `${from.getHours()}:${from.getMinutes() < 10 ? "0" : ""}${from.getMinutes()}`;
											const toTime = `${to.getHours()}:${to.getMinutes() < 10 ? "0" : ""}${to.getMinutes()}`;

											return (
												<AlertRow key={index}>
													<AlertTop>
														<AlertTitle>{alert.event}!</AlertTitle>
														<AlertTimes title="estimated time">
															<span>{fromTime}</span>-<span>{toTime}</span>
														</AlertTimes>
													</AlertTop>
													<AlertDesc>{alert.description}</AlertDesc>
													<AlertSource>
														<span>Source:</span>
														<span>{alert.sender_name}</span>
													</AlertSource>
												</AlertRow>
											);
										})}
									</MenuMoreWeatherInfo>
								</>
							)}
						</ModalContainer>
					)}
					
				</MenuContainer>
			</ModalContainer>
			<MailboxButton refresh={res} refreshMailboxes={refreshConfig} refreshData={refreshData} />
			</Container>
			<Content isBlurred={isModalOpen}>
				<Time className={isVisible ? 'appear' : ''}><code>{time}</code></Time>
				<Greetings>
					<span>{message}{nickname ? ',' : ''} <strong>{nickname ? ` ${nickname}` : ''}{mark}</strong></span>
				</Greetings>
				<SearchForm onSubmit={searchUrl}>
					<SearchBox>
						<UrlInput autoFocus ref={searchRef} name="url" placeholder="Search something..." />
						<FunctionBox engine={engine} onClick={configModal}>
							{engine === "google" && <FcGoogle />}
							{engine === "bing" && <DiBingSmall />}
							{engine === "yahoo" && <FaYahoo />}
							{engine === "duckduckgo" && <SiDuckduckgo />}
							{engine === "amazon" && <img src={amazon} width="20" height="20" alt="Amazon logo" />}
							{engine === "reddit" && <FaReddit />}
							{engine === "twitch" && <FaTwitch />}
							{engine === "youtube" && <FaYoutube />}
							{engine === "wikipedia" && <FcWikipedia />}
							{engine === "imdb" && <FaImdb />}
							{engine === "github" && <FaGithub />}
							{engine === "ecosia" && <FaTree />}
						</FunctionBox>
						<FunctionBox as="label" type="image" corner>
							<MdSearch />
							<input type="submit" />
						</FunctionBox>
					</SearchBox>
				</SearchForm>
				{localStorage.getItem("cardnames") && <Cards addCard={() => addModal} refresh={res} openEdit={() => addEditModal} />}
			</Content>
			<ContainerFooter>
			<CalculatorButton />
			</ContainerFooter>
		</Background>
	);
};

export default Home;
