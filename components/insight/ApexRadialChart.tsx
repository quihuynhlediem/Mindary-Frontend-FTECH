"use client"
import React, { Component, use, useCallback, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';
import Chart from "react-apexcharts";
import useAuthStore from "@/hooks/useAuthStore";
import axiosInstance from "@/apiConfig";
import Loader from "../general/Loader";


export default function ApexRadialChart() {
    const { accessToken, userId } = useAuthStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [emotionLevel, SetEmotionLevel] = useState<number[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>("week");
    const chartLabels = ["Great", "Good", "Okay", "Not Good", "Bad"];
    const periods = ["week", "month", "year"];
    const [state, setState] = useState<{
        series: number[];
        options: ApexOptions;
    }>({

        series: emotionLevel,
        options: {
            chart: {
                height: 390,
                type: 'radialBar' as const,

            },
            plotOptions: {

                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 5,
                        size: '30%',
                        background: 'transparent',
                        image: undefined,
                        imageWidth: 100,
                        imageHeight: 100,


                    },
                    track: {
                        show: true,
                        startAngle: 0,
                        endAngle: 270,
                        background: '#f2f2f2',
                        strokeWidth: '97%',
                        opacity: 1,
                        margin: 6,
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    dataLabels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '18px',
                            fontFamily: undefined,
                            fontWeight: 600,
                            color: undefined,
                            offsetY: -2,
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: undefined,
                            fontWeight: 400,
                            color: undefined,
                            offsetY: 2,
                            formatter: function (val) {
                                // return (val / 100 * 5).toString() + `${(val / 100 * 5) > 1 ? " times" : " time"}`;
                                return (val / 100 * 5).toString();
                            }
                        },
                        total: {
                            show: true,
                            label: 'Diaries',
                            fontSize: '18px',
                            fontWeight: 600,
                            formatter: function (w) {
                                const total = w.globals.seriesTotals.reduce((a, b) => a + (b / 100 * 5), 0);
                                return `${total}`;
                            },
                        }
                    },
                    barLabels: {
                        enabled: true,
                        useSeriesColors: true,
                        offsetX: -20, // Adjust this to make space for icons
                        fontSize: '16px',
                        formatter: function (seriesName, opts) {
                            // Get the emotion level value and format it to one decimal place
                            const emotionLevel = (opts.w.globals.series[opts.seriesIndex] / 100 * 5);

                            // Return the formatted string: "Mood (Emotion Level)"
                            return `${seriesName} (${emotionLevel})`;
                        },

                    }

                }
            },
            stroke: {
                lineCap: 'round', // This will create rounded corners on the bar
                // width: 10 // Increase width to create a bigger radius effect
            },
            colors: ["var(--chart-1)", 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'],
            labels: chartLabels,
            responsive: [
                {
                    breakpoint: 1200,
                    options: {
                        chart: {
                            height: 360
                        },
                        plotOptions: {
                            radialBar: {
                                hollow: {
                                    size: '28%'
                                },
                                dataLabels: {
                                    name: {
                                        fontSize: '16px',
                                    },
                                    value: {
                                        fontSize: '14px',
                                    },
                                    total: {
                                        fontSize: '16px'
                                    }
                                },
                                barLabels: {
                                    fontSize: '14px',
                                    offsetX: -15
                                }
                            }
                        }
                    }
                },
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 320
                        },
                        plotOptions: {
                            radialBar: {
                                hollow: {
                                    size: '25%'
                                },
                                offsetY: -10,
                                dataLabels: {
                                    name: {
                                        fontSize: '14px',
                                        offsetY: -2
                                    },
                                    value: {
                                        fontSize: '12px',
                                        offsetY: 2
                                    },
                                    total: {
                                        fontSize: '16px'
                                    }
                                },
                                barLabels: {
                                    fontSize: '12px',
                                    offsetX: -10
                                }
                            }
                        }
                    }
                },
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            height: 280
                        },
                        legend: {
                            show: false
                        },
                        plotOptions: {
                            radialBar: {
                                hollow: {
                                    size: '20%'
                                },
                                offsetY: -5,
                                dataLabels: {
                                    show: true,
                                    name: {
                                        show: true,
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        offsetY: -2
                                    },
                                    value: {
                                        show: true,
                                        fontSize: '11px',
                                        fontWeight: 400,
                                        offsetY: 2,
                                        formatter: function (val) {
                                            return (val / 100 * 5).toString()
                                        }
                                    },
                                    total: {
                                        fontSize: '14px'
                                    }
                                },
                                barLabels: {
                                    enabled: true,
                                    useSeriesColors: true,
                                    offsetX: -5,
                                    fontSize: '11px',
                                    formatter: function (seriesName, opts) {
                                        // Shorter labels for small screens
                                        const val = (opts.w.globals.series[opts.seriesIndex] / 100 * 5);
                                        return `${seriesName} (${val})`;
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        },
    });

    const fetchEmotionLevelByPeriod = useCallback(async () => {
        if (!userId || !accessToken) {
            setErrorMessage("Missing user ID oror token");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const res = await axiosInstance.get(
                `/diary/emotionlevel/piechart?userId=${userId}&filter=${filter}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(res.data);
            SetEmotionLevel(res.data);
        } catch (err) {
            console.error("Error fetching chart data:", err)
            setErrorMessage("Failed to load chart data. Please try again later.")
        } finally {
            setIsLoading(false)
        }
    }, [userId, accessToken, filter]);

    useEffect(() => {
        fetchEmotionLevelByPeriod();
    }, [fetchEmotionLevelByPeriod]);

    useEffect(() => {
        // Update the chart state when emotionLevel changes, scaling by 20 to get values between 0-100
        if (emotionLevel.length > 0) {
            setState(prevState => ({
                ...prevState,
                series: emotionLevel.map(value => value * 20) // Scale by 20 to get values between 0-100
            }));
        }
    }, [emotionLevel]);

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    if (isLoading) {
        return <Loader />
    }

    if (errorMessage) {
        return (
            <div className="text-center py-4 text-red-500">
                <p>{errorMessage}</p>
                <button
                    className="mt-2 text-blue-500 hover:underline"
                    onClick={fetchEmotionLevelByPeriod}
                >
                    Retry
                </button>
            </div>
        );
    }
    return (
        <>
            <div className="mx-4 px-4 py-4 bg-white rounded-lg flex flex-col justify-start items-center gap-4">
                <div className="text-black text-xl font-bold font-sans leading-7 self-start">Mood Count</div>
                <div className="self-stretch h-0 relative">
                    <div className="w-[100%] h-0 left-0 top-0 absolute outline outline-1 outline-offset-[-0.50px] outline-[#EEEEEE]"></div>
                </div>
                <div className="flex justify-center space-x-2 my-2">
                    {periods.map((period) => (
                        <button
                            key={period}
                            onClick={() => handleFilterChange(period)}
                            className={`px-3 py-1 rounded text-sm ${filter === period
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80"
                                }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>
                <div id="chart">
                    <ReactApexChart options={state.options} series={emotionLevel.length > 0 ? state.series : [0, 0, 0, 0, 0]} type="radialBar" height={390} />
                </div>
                <div id="html-dist"></div>
            </div>
        </>
    );
}


