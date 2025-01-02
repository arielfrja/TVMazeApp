using System.Text.Json.Serialization;
using System.Text.Json;

namespace TVMazeApp.Server.Logic
{
    /// <summary>
    /// Class TimeOnlyConverter is a custom JSON converter for the TimeOnly? type.
    /// because the default JSON converter doesn't support empty string;
    /// </summary>
    public class TimeOnlyConverter : JsonConverter<TimeOnly?>
    {
        public override TimeOnly? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.String)
            {
                var stringValue = reader.GetString();
                if (string.IsNullOrEmpty(stringValue))
                {
                    return null; // Handle empty or null string
                }

                if (TimeOnly.TryParse(stringValue, out var result))
                {
                    return result;
                }
            }
            return null;
        }

        public override void Write(Utf8JsonWriter writer, TimeOnly? value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value?.ToString("HH:mm"));
        }
    }

    /// <summary>
    /// Class DateOnlyConverter is a custom JSON converter for the DateOnly? type.
    /// because the default JSON converter doesn't support empty string;
    /// </summary>
    public class DateOnlyConverter : JsonConverter<DateOnly?>
    {
        public override DateOnly? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.String)
            {
                var stringValue = reader.GetString();
                if (string.IsNullOrEmpty(stringValue))
                {
                    return null; // Handle empty or null string
                }

                if (DateOnly.TryParse(stringValue, out var result))
                {
                    return result;
                }
            }
            return null;
        }

        public override void Write(Utf8JsonWriter writer, DateOnly? value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value?.ToString("yyyy-MM-dd"));
        }
    }

    /// <summary>
    /// Class DateTimeConverter is a custom JSON converter for the DateTime? type.
    /// because the default JSON converter doesn't support empty string;
    /// </summary>
    public class DateTimeConverter : JsonConverter<DateTime?>
    {
        public override DateTime? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.String)
            {
                var stringValue = reader.GetString();
                if (string.IsNullOrEmpty(stringValue))
                {
                    return null; // Handle empty or null string
                }

                if (DateTime.TryParse(stringValue, out var result))
                {
                    return result;
                }
            }
            return null;
        }

        public override void Write(Utf8JsonWriter writer, DateTime? value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value?.ToString("O"));
        }
    }
}
