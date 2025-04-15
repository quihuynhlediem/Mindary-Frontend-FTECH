import { UUID } from "crypto";


export interface Diaries {
    [date: string]: string | null;
}

export interface ErrorResponse {
    status: BigInteger,
    message: string
}

export interface DiaryImageDto {
    id: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

export interface DiaryDto {
    id: string;
    content: string;
    userId: string;
    images: DiaryImageDto[];
    createdAt: string;
    updatedAt: string;
}

export interface Datum {
    imageLink: any[];
    _id: string;
    senderId: string;
    content: string;
    moodObjects: MoodObject[];
    correlationObjects: Array<CorrelationObject[]>;
    symptomObjects: Array<SymptomObject[]>;
    recommendations: Recommendation[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface CorrelationObject {
    name: string;
    description: string;
}

export interface MoodObject {
    category: string[];
    emotionLevel: string;
    summary: string;
}

export interface SymptomObject {
    risk: string;
    name: string;
    suggestions: string;
    description: string;
}

export interface Recommendation {
    practice: string;
    action: string;
    benefit: string;
}

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    userId: UUID
}

// export function parseDiary(data: any): Diary {
//     if (!data || !Array.isArray(data.data)) {
//         throw new Error("Invalid data format for Diary");
//     }

//     const parsedData: Datum[] = data.data.map((datum: any, index: number) => {
//         return {
//             recommendations: Array.isArray(datum.recommendations)
//                 ? parseRecommendation(datum.recommendations)
//                 : [],
//             imageLink: Array.isArray(datum.imageLink) ? datum.imageLink : [],
//             _id: parseString(datum._id, `_id at index ${index}`),
//             senderId: parseString(datum.senderId, `senderId at index ${index}`),
//             content: parseString(datum.content, `content at index ${index}`),
//             moodObjects: Array.isArray(datum.moodObjects)
//                 ? datum.moodObjects.map((mo: any, moIndex: number) =>
//                     parseMoodObject(mo, moIndex, index),
//                 )
//                 : [],
//             correlationObjects: Array.isArray(datum.correlationObjects)
//                 ? datum.correlationObjects.map((coArray: any[], coArrayIndex: number) =>
//                     coArray.map((co: any, coIndex: number) =>
//                         parseCorrelationObject(co, coIndex, index, coArrayIndex),
//                     ),
//                 )
//                 : [],
//             symptomObjects: Array.isArray(datum.symptomObjects)
//                 ? datum.symptomObjects.map((soArray: any[], soArrayIndex: number) =>
//                     soArray.map((so: any, soIndex: number) =>
//                         parseSymptomObject(so, soIndex, index, soArrayIndex),
//                     ),
//                 )
//                 : [],
//             createdAt: parseDate(datum.createdAt, `createdAt at index ${index}`),
//             updatedAt: parseDate(datum.updatedAt, `updatedAt at index ${index}`),
//             __v: parseNumber(datum.__v, `__v at index ${index}`),
//         };
//     });

//     return { data: parsedData };
// }

/**
 * Parses a CorrelationObject.
 */
function parseCorrelationObject(
    data: any,
    coIndex: number,
    datumIndex: number,
    coArrayIndex: number,
): CorrelationObject {
    return {
        name: parseString(
            data.name,
            `CorrelationObject.name at Datum ${datumIndex}, CorrelationArray ${coArrayIndex}, Index ${coIndex}`,
        ),
        description: parseString(
            data.description,
            `CorrelationObject.description at Datum ${datumIndex}, CorrelationArray ${coArrayIndex}, Index ${coIndex}`,
        ),
    };
}

/**
 * Parses a MoodObject.
 */
function parseMoodObject(
    data: any,
    moIndex: number,
    datumIndex: number,
): MoodObject {
    return {
        category: Array.isArray(data.category)
            ? data.category.map((cat: any, catIndex: number) =>
                parseString(
                    cat,
                    `MoodObject.category[${catIndex}] at Datum ${datumIndex}, MoodObject ${moIndex}`,
                ),
            )
            : [],
        emotionLevel: parseString(
            data.emotionLevel,
            `MoodObject.emotionLevel at Datum ${datumIndex}, MoodObject ${moIndex}`,
        ),
        summary: parseString(
            data.summary,
            `MoodObject.summary at Datum ${datumIndex}, MoodObject ${moIndex}`,
        ),
    };
}

/**
 * Parses a SymptomObject.
 */
function parseSymptomObject(
    data: any,
    soIndex: number,
    datumIndex: number,
    soArrayIndex: number,
): SymptomObject {
    return {
        risk: parseString(
            data.risk,
            `SymptomObject.risk at Datum ${datumIndex}, SymptomArray ${soArrayIndex}, Index ${soIndex}`,
        ),
        name: parseString(
            data.name,
            `SymptomObject.name at Datum ${datumIndex}, SymptomArray ${soArrayIndex}, Index ${soIndex}`,
        ),
        suggestions: parseString(
            data.suggestions,
            `SymptomObject.suggestions at Datum ${datumIndex}, SymptomArray ${soArrayIndex}, Index ${soIndex}`,
        ),
        description: parseString(
            data.description,
            `SymptomObject.description at Datum ${datumIndex}, SymptomArray ${soArrayIndex}, Index ${soIndex}`,
        ),
    };
}

/**
 * Utility function to parse a string with error handling.
 */
function parseString(value: any, fieldName: string): string {
    if (typeof value !== "string") {
        throw new Error(
            `Expected string for ${fieldName}, but got ${typeof value}`,
        );
    }
    return value;
}

/**
 * Utility function to parse a Date with error handling.
 */
function parseDate(value: any, fieldName: string): Date {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date for ${fieldName}: ${value}`);
    }
    return date;
}

/**
 * Utility function to parse a number with error handling.
 */
function parseNumber(value: any, fieldName: string): number {
    const num = Number(value);
    if (isNaN(num)) {
        throw new Error(`Invalid number for ${fieldName}: ${value}`);
    }
    return num;
}

function parseRecommendation(value: any[][]): Recommendation[] {
    const inner = value[0];

    if (!inner || inner.length <= 0) {
        return [];
    }

    return inner.map((v) => {
        return {
            practice: v.practice || "",
            action: v.action || "",
            benefit: v.benefit || "",
        };
    });
}